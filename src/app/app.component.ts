import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { default as dayjs } from "dayjs";
import { EditItemComponent } from "./edit-item/edit-item.component";
dayjs().format();
interface ItemsInterface {
  id: number;
  date: string;
  price: number;
  payment: string;
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
  cardType: string = "Débito";
  showEdit: boolean = false;
  selectedItem: number = 0;

  items: ItemsInterface[] = [
    {
      id: 1723768019,
      date: "15/08/2024 - 15:32",
      price: 80,
      payment: "Pix",
    },
  ];

  addItem() {
    if (
      this.paymentMethod != "" &&
      this.priceValue != 0 &&
      this.priceValue != null
    ) {
      this.items.push({
        id: dayjs().valueOf(),
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
  }

  showEditCard(id: number) {
    this.showEdit = true;
    this.selectedItem = id;
  }

  onShowEditCard(value: boolean) {
    this.showEdit = value;
  }
}
