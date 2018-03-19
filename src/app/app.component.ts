import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Phonstr';

  manfctr = [
    {
      title: "Samsung",
      cnt: 0,
      checked: false
    },
    {
      title: "Apple",
      cnt: 0,
      checked: false
    },
    {
      title: "Moto",
      cnt: 0,
      checked: false
    }
  ];

  bdgtRangeData = [
    {
      index: 0,
      start: 0,
      end: 100,
      cnt: 0,
      checked: true
    },
    {
      index: 1,
      start: 101,
      end: 300,
      cnt: 0,
      checked: true
    },
    {
      index: 2,
      start: 301,
      end: 600,
      cnt: 0,
      checked: true
    },
    {
      index: 3,
      start: 601,
      end: 10000,
      cnt: 0,
      checked: true
    },
  ];

  superData = [
    {
      title: "Moto G5",
      price: 1200,
      priceRange: 3,
      make: 2,
      detail: "The latest phone by Moto. Moto is the one who bought Lenovo. Moto owns Lenovo now. Moto also owns Moto, which is very good."
    },
    {
      title: "Iphone 6",
      price: 1200,
      priceRange: 3,
      make: 1,
      detail: "Iphone is strong and sturdy. Nah, just kidding, the glass is gonna crack on first fall. But if you get one, you can show your friends how rich you are, which is nice."
    },
    {
      title: "Lenovo XL",
      price: 305,
      priceRange: 2,
      make: 2,
      detail: "Lenovo is bought by Moto. Moto owns Lenovo now. Lenovo doesn't own Moto. Lenovo doesn't even own Lenovo anymore. Poor Lenovo!"
    },
    {
      title: "Samsung S9",
      price: 780,
      priceRange: 3,
      make: 0,
      detail: "Samsung is a good phone when it doesn't explode. When it does, it is a bad phone. Samsung never sold itself like Lenovo. Which means, Moto doesn't own Samsung. Poor Moto."
    }
  ];

  data = [];
  data = this.superData;

  phones = [];
  phones = this.data;

  bdgtRange = [];
  bdgtRange = this.bdgtRangeData;

  priceRangeChange = function(type, index, newVal){
    this[type][index].checked = newVal;
    console.log(this[type][index].checked);
    if(this.manfctr.every(function(man){
      return man.checked;
    }) || this.manfctr.every(function(man){
      return !man.checked;
    })){
      var obj = this;
      this.bdgtRange = this.bdgtRangeData;
      this.phones = this.data;
    } else {
      this.phones = [];
      this.bdgtRange = [];
      var i = 0;
      for(i=0; i<this.data.length; i++){
        if(this.manfctr[this.data[i].make].checked){
          if(this.bdgtRange.indexOf(this.bdgtRangeData[this.data[i].priceRange]) == -1){
            this.bdgtRange.push(this.bdgtRangeData[this.data[i].priceRange]);
          }
          this.phones.push(this.data[i]);
        }

      }
    }

    this.countPhonesByPriceRange(this.bdgtRangeData);
    this.filterPhones(this.bdgtRangeData);


  }

  countPhonesByPriceRange = function(bdgtRangeData){
    this.bdgtRangeData.forEach(function(bdgt){
      bdgt.cnt = 0;
    });
    this.phones.forEach(function(phone){
      bdgtRangeData[phone.priceRange].cnt++;
    });
    this.bdgtRange.forEach(function(bdgt){
      bdgt.cnt = bdgtRangeData[bdgt.index].cnt;
    })
  }

  countPhonesByManufacturers = function(manfctr){
    this.manfctr.forEach(function(man){
      man.cnt = 0;
    });
    this.data.forEach(function(phone){
      manfctr[phone.make].cnt++;
    });
  }

  filterPhones = function(bdgtRangeData){
    this.phones = this.phones.filter(function(phone){
      if(bdgtRangeData[phone.priceRange].checked){
        return true;
      } else return false;
    });

  }

  srch = "";

  srchChanged = function(event){

    event = event.trim();
    this.srch = event;

    if(event.length == 0) {
      this.data = this.superData;
      this.countPhonesByManufacturers(this.manfctr);
      this.priceRangeChange('manfctr', 0, this.manfctr[0].checked);
      console.log('clear');
      return;
    }
    this.data = this.superData;
    this.data = this.data.filter(function(data){
      if(new RegExp("" + event + "", "i").test(data.title)){
        console.log("matched " + data.title);
        return true;
      } else {
        console.log("unmatched " + data.title);
        return false;
      }
    });
    this.countPhonesByManufacturers(this.manfctr);
    this.priceRangeChange('manfctr', 0, this.manfctr[0].checked);
  }

  clearSearch = function(){
    this.srch = '';
    this.srchChanged('');
  }

  ngOnInit() {
    this.countPhonesByManufacturers(this.manfctr);
    this.countPhonesByPriceRange(this.bdgtRangeData);
  }

}
