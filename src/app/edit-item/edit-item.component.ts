import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface ItemsInterface {
  id: number;
  date: string;
  price: number;
  payment: string;
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
  @Input() items!: ItemsInterface[];
  @Input() selectedItem!: number;
  @Output() showEditChange = new EventEmitter<boolean>();

  ngOnInit() {
    const itemIndex: number = this.items.findIndex(
      (e) => e.id === this.selectedItem
    );
    this.newPrice = this.items[itemIndex].price;
  }

  close() {
    this.showEditChange.emit(false);
  }

  updateItem() {
    const itemIndex: number = this.items.findIndex(
      (e) => e.id === this.selectedItem
    );
    this.items[itemIndex]["price"] = this.newPrice;
    this.close();
  }
}
