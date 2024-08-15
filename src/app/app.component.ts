import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ItemsInterface {
  id: number;
  date: string;
  price: string;
  payment: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'naribrecho';
  priceValue = '';
  items: ItemsInterface[] = [
    {
      id: 1,
      date: '14/08/24',
      price: '14',
      payment: 'Pix',
    },
    {
      id: 2,
      date: '14/08/24',
      price: '13',
      payment: 'Dinheiro',
    },
    {
      id: 3,
      date: '14/08/24',
      price: '140',
      payment: 'Crédito',
    },
  ];

  addItem(price: any) {
    this.items.push({ id: 2, date: '14/08/24', price: price, payment: 'Pix' });
    this.priceValue = '';
  }
  mask() {
    function preco(preco: string) {
      preco = preco.replace(/\D/g, '');
      preco = (Number(preco) / 100).toFixed(2).replace('.', ',');
      return preco;
    }
    this.priceValue = 'R$ ' + preco(this.priceValue);
  }
}
