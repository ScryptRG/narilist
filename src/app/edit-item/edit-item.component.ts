import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
  selector: "edit-item",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./edit-item.component.html",
  styleUrl: "./edit-item.component.scss",
})
export class EditItemComponent {
  newPrice = 0;
  newPayment = "";
  newDate = "";
  @Input() items!: MonthInterface;
  @Input() selectedItem!: number;
  @Output() showEditChange = new EventEmitter<boolean>();

  ngOnInit() {
    const itemIndex: number = this.items.julho.findIndex(
      (e) => e.id === this.selectedItem
    );
    this.newPrice = this.items.julho[itemIndex].price;
    this.newPayment = this.items.julho[itemIndex].payment;
    this.newDate = dayjs(this.items.julho[itemIndex].dateId).format(
      "YYYY-MM-DDTHH:mm"
    );
  }

  close() {
    this.showEditChange.emit(false);
  }

  SP(e: Event) {
    e.stopPropagation();
  }

  updateItem() {
    const itemIndex: number = this.items.julho.findIndex(
      (e) => e.id === this.selectedItem
    );
    this.items.julho[itemIndex].price = this.newPrice;
    this.items.julho[itemIndex].payment = this.newPayment;
    this.items.julho[itemIndex].date = dayjs(this.newDate).format(
      "DD/MM/YYYY - HH:mm"
    );
    this.items.julho[itemIndex].dateId = dayjs(this.newDate).valueOf();

    localStorage.setItem("data", JSON.stringify(this.items));
    this.close();
  }
}
