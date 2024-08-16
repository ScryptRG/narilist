import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
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
  julho: ItemsInterface[];
  agosto: ItemsInterface[];
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
  selectedItem: number = 1;

  items: MonthInterface = {
    julho: [],
    agosto: [
      {
        id: 21,
        dateId: 1785623411,
        date: dayjs(1664874010125).format("DD/MM/YYYY"),
        price: 50,
        payment: "Débito",
      },
    ],
  };

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem("data") || "");
  }

  addItem() {
    if (
      this.paymentMethod != "" &&
      this.priceValue != 0 &&
      this.priceValue != null
    ) {
      this.items.julho.push({
        id: dayjs().valueOf(),
        dateId: dayjs().valueOf(),
        date: dayjs().format("DD/MM/YYYY - HH:mm"),
        price: this.priceValue,
        payment:
          this.paymentMethod === "" || this.paymentMethod === "card"
            ? this.cardType
            : this.paymentMethod,
      });
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
    this.selectedItem = id;
  }

  onShowEditCard(value: boolean) {
    this.showEdit = value;
  }

  formatDate(date: any) {
    dayjs(date).format("DD/MM/YYYY - HH:mm");
  }
}
