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
  newMonth!: keyof MonthInterface;
  monthKeys!: (keyof MonthInterface)[];
  @Input() items!: MonthInterface;
  @Input() itemId!: number;
  @Input() selectedMonth!: keyof MonthInterface;
  @Output() showEditCard = new EventEmitter<boolean>();
  @Output() setMonthSelling = new EventEmitter<boolean>();
  selectedItem!: ItemsInterface;

  ngOnInit() {
    this.monthKeys = Object.keys(this.items) as (keyof MonthInterface)[];
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

  changeItemMonth() {
    // this.getMonth(new Date(this.newDate));
    console.log(this.monthKeys);
    this.newMonth = this.monthKeys[dayjs(this.newDate).get("month")];
    this.items[this.newMonth].push({
      id: this.itemId,
      dateId: dayjs(this.newDate).valueOf(),
      date: dayjs(this.newDate).format("DD/MM/YYYY - HH:mm"),
      price: this.newPrice,
      payment: this.newPayment,
    });
    this.items[this.selectedMonth] = this.items[this.selectedMonth].filter(
      (e) => e.id != this.itemId
    );
  }

  updateItem() {
    if (
      dayjs(this.selectedItem.dateId).get("month") ===
      dayjs(this.newDate).get("month")
    ) {
      this.selectedItem.price = this.newPrice;
      this.selectedItem.payment = this.newPayment;
      this.selectedItem.date = dayjs(this.newDate).format("DD/MM/YYYY - HH:mm");
      this.selectedItem.dateId = dayjs(this.newDate).valueOf();
    } else {
      this.changeItemMonth();
    }
    localStorage.setItem("data", JSON.stringify(this.items));
    this.setMonthSelling.emit();
    this.close();
  }

  deleteItem() {
    {
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
}
