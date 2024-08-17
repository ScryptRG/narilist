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
  @Input() itemId!: number;
  @Input() selectedMonth!: keyof MonthInterface;
  @Output() showEditCard = new EventEmitter<boolean>();
  @Output() setMonthSelling = new EventEmitter<boolean>();
  selectedItem!: ItemsInterface;

  ngOnInit() {
    this.selectedItem =
      this.items[this.selectedMonth][
        this.items[this.selectedMonth].findIndex((e) => e.id === this.itemId)
      ];
    this.newPrice = this.selectedItem.price;
    this.newPayment = this.selectedItem.payment;
    this.newDate = dayjs(this.selectedItem.dateId).format("YYYY-MM-DDTHH:mm");
  }

  close() {
    this.showEditCard.emit(false);
  }

  SP(e: Event) {
    e.stopPropagation();
  }

  updateItem() {
    this.selectedItem.price = this.newPrice;
    this.selectedItem.payment = this.newPayment;
    this.selectedItem.date = dayjs(this.newDate).format("DD/MM/YYYY - HH:mm");
    this.selectedItem.dateId = dayjs(this.newDate).valueOf();
    this.setMonthSelling.emit();
    localStorage.setItem("data", JSON.stringify(this.items));
    this.close();
  }

  deleteItem() {
    const qst = confirm("Tem certeza que deseja remover essa venda?");
    if (qst) {
      this.items[this.selectedMonth] = this.items[this.selectedMonth].filter(
        (e) => e.id != this.itemId
      );
      this.setMonthSelling.emit();
      localStorage.setItem("data", JSON.stringify(this.items));
      this.close();
    }
  }
}
