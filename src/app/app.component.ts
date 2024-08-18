import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { default as dayjs } from "dayjs";
dayjs().format();
interface ItemsInterface {
  id: number;
  dateId: number;
  date: string;
  price: number;
  payment: string;
}

interface MonthInterface {
  janeiro: ItemsInterface[];
  fevereiro: ItemsInterface[];
  marco: ItemsInterface[];
  abril: ItemsInterface[];
  maio: ItemsInterface[];
  junho: ItemsInterface[];
  julho: ItemsInterface[];
  agosto: ItemsInterface[];
  setembro: ItemsInterface[];
  outubro: ItemsInterface[];
  novembro: ItemsInterface[];
  dezembro: ItemsInterface[];
}
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, EditItemComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  priceValue: number = 0;
  paymentMethod: string = "";
  selectedMonth: keyof MonthInterface = "julho";
  cardType: string = "Débito";
  showEdit: boolean = false;
  itemId: number = 1;
  monthSelling: number = 0;

  items: MonthInterface = {
    janeiro: [],
    fevereiro: [],
    marco: [],
    abril: [],
    maio: [],
    junho: [],
    julho: [],
    agosto: [],
    setembro: [],
    outubro: [],
    novembro: [],
    dezembro: [],
  };

  monthKeys: any = Object.keys(this.items);

  setMonthSelling(month: keyof MonthInterface) {
    this.monthSelling = this.items[month].reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
  }

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem("data") || "");
    this.setMonthSelling(this.selectedMonth);
  }

  getMonth(date: Date) {
    switch (dayjs(date).get("month")) {
      case 0:
        this.selectedMonth = "janeiro";
        break;
      case 1:
        this.selectedMonth = "fevereiro";
        break;
      case 2:
        this.selectedMonth = "marco";
        break;
      case 3:
        this.selectedMonth = "abril";
        break;
      case 4:
        this.selectedMonth = "maio";
        break;
      case 5:
        this.selectedMonth = "junho";
        break;
      case 6:
        this.selectedMonth = "julho";
        break;
      case 7:
        this.selectedMonth = "agosto";
        break;
      case 8:
        this.selectedMonth = "setembro";
        break;
      case 9:
        this.selectedMonth = "outubro";
        break;
      case 10:
        this.selectedMonth = "novembro";
        break;
      default:
        this.selectedMonth = "dezembro";
        break;
    }
  }

  addItem() {
    if (
      this.paymentMethod != "" &&
      this.priceValue != 0 &&
      this.priceValue != null
    ) {
      this.getMonth(new Date());
      this.items[this.selectedMonth].push({
        id: dayjs().valueOf(),
        dateId: dayjs().valueOf(),
        date: dayjs().format("DD/MM/YYYY - HH:mm"),
        price: this.priceValue,
        payment:
          this.paymentMethod === "" || this.paymentMethod === "card"
            ? this.cardType
            : this.paymentMethod,
      });
      this.setMonthSelling(this.selectedMonth);
    }
    if (this.priceValue === 0 || this.priceValue === null) {
      alert("Adicione um preço");
    } else if (this.paymentMethod === "") {
      alert("Adicione um método de pagamento");
    } else {
      this.priceValue = 0;
    }

    localStorage.setItem("data", JSON.stringify(this.items));
  }

  showEditCard(id: number) {
    this.showEdit = true;
    this.itemId = id;
  }

  onShowEditCard(value: boolean) {
    this.showEdit = value;
  }

  formatDate(date: Date) {
    dayjs(date).format("DD/MM/YYYY - HH:mm");
  }

  changeMonth(month: keyof MonthInterface) {
    this.selectedMonth = month;
    this.setMonthSelling(month);
  }
}
