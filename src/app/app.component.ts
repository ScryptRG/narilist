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
  selectedMonth!: keyof MonthInterface;
  cardType: string = "Débito";
  showEdit: boolean = false;
  itemId: number = 1;
  monthSelling: any = 0;
  monthBox: boolean = false;

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

  monthKeys: (keyof MonthInterface)[] = Object.keys(
    this.items
  ) as (keyof MonthInterface)[];

  setMonthSelling(month: keyof MonthInterface) {
    this.monthSelling = this.items[month].reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
  }

  ngOnInit(): void {
    this.selectedMonth = Object.keys(this.items)[
      dayjs().get("month")
    ] as keyof MonthInterface;
    this.items = JSON.parse(localStorage.getItem("data") || "");
    this.setMonthSelling(this.selectedMonth);
  }

  addItem() {
    if (
      this.paymentMethod != "" &&
      this.priceValue != 0 &&
      this.priceValue != null
    ) {
      if (this.selectedMonth === this.monthKeys[dayjs().get("month")]) {
        this.selectedMonth = this.monthKeys[dayjs().get("month")];
      }
      this.items[this.selectedMonth].push({
        id: dayjs().valueOf(),
        dateId: dayjs().valueOf(),
        date: dayjs().format("DD/MM/YYYY"),
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
    dayjs(date).format("DD/MM/YYYY");
  }

  changeMonth(month: keyof MonthInterface) {
    this.selectedMonth = month;
    this.showMonthBox();
    this.setMonthSelling(month);
  }

  showMonthBox() {
    this.monthBox = !this.monthBox;
  }

  formatValue(value: number) {
    const formattedValue = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    return formattedValue;
  }
}
