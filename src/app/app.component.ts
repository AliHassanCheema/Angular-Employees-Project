import {
  Component,
  Input,
  ViewChild
} from '@angular/core';
// import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {
  DialogFormComponent
} from './dialog-form/dialog-form.component';
import {
  MatPaginator,
  PageEvent
} from '@angular/material/paginator';

import {
  Location
} from '@angular/common';
import {
  FormControl
} from '@angular/forms';
// import { clear } from 'console';

// import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;

  title = 'Employees';
  data: any[];
  selectedRow: any;
  // editData: any;
  limit: any;
  newData: any;
  offSet: any;
  order: any;
  searchField: FormControl;
  msg: string;
  constructor(private dialog: MatDialog) {
    this.newData = null
    this.limit = "10"
    this.offSet = 0;
    this.msg = "Not Match";
    this.searchField = new FormControl();

    this.data = [{
        id: 1,
        company: 'CHI',
        contact: 'ALI ',
        country: 'Pakistan'
      },
      {
        id: 2,
        company: 'Netsol',
        contact: 'Farid',
        country: 'UAE'
      },
      {
        id: 9,
        company: 'CHI',
        contact: 'Zain',
        country: 'KSA'
      },

      {
        id: 4,
        company: 'Systems Limited',
        contact: 'Jawad',
        country: 'Spain'
      },
      {
        id: 5,
        company: 'Nescom',
        contact: 'Zeeshan',
        country: 'Swedan'
      },
      {
        id: 6,
        company: 'Netsol',
        contact: 'Faridullah',
        country: 'Ireland'
      },
      {
        id: 7,
        company: 'Systems Limited',
        contact: 'Jawad1',
        country: 'South Africa'
      },
      {
        id: 8,
        company: 'CHI',
        contact: 'Ali ',
        country: 'UAE'
      },
      {
        id: 3,
        company: 'Netsol',
        contact: 'Faridullah1',
        country: 'Spain'
      },
      {
        id: 10,
        company: 'CHI',
        contact: 'Zain233',
        country: 'Italy'
      },
      {
        id: 11,
        company: 'CHI',
        contact: 'ALI ',
        country: 'Italy'
      },
      {
        id: 2,
        company: 'Netsol',
        contact: 'Farid',
        country: 'Turkey'
      },
      {
        id: 9,
        company: 'CHI',
        contact: 'Zain',
        country: 'Pakistan'
      },
      {
        id: 4,
        company: 'Systems Limited',
        contact: 'Jawad',
        country: 'Pakistan'
      },
      {
        id: 5,
        company: 'Nescom',
        contact: 'Zeeshan',
        country: 'Pakistan'
      },
      {
        id: 6,
        company: 'Netsol',
        contact: 'Faridullah',
        country: 'Pakistan'
      },
      {
        id: 7,
        company: 'Systems Limited',
        contact: 'Jawad1',
        country: 'Pakistan'
      },
      {
        id: 8,
        company: 'CHI',
        contact: 'Ali ',
        country: 'MOSCOW'
      },
      {
        id: 3,
        company: 'Netsol',
        contact: 'Faridullah1',
        country: 'BERLIN'
      },
      {
        id: 10,
        company: 'CHI',
        contact: 'Zain233',
        country: 'Italy'
      },
    ]
    this.newData = this.data.filter((val, idx) => {
      if (idx < this.limit) return val;
    })
  }

  select(d: any) {
    if (this.selectedRow === d) {
      this.selectedRow = null;
    } else {
      this.selectedRow = d;
    }
  }

  openDialog() {
    const config: MatDialogConfig = {
      width: "25%",
      height: "70%",
      panelClass: "default"
    }
    const dialog = this.dialog.open(DialogFormComponent, config)
    dialog.afterClosed().subscribe((val: any) => {
      if (val) {
        this.newData.push(val)
      }
    })
  }

  openDialogForEdit() {
    const dialog = this.dialog.open(DialogFormComponent, {
      width: "25%",
      height: "70%",
      panelClass: "default"
    })
    dialog.componentInstance.selectedRow = this.selectedRow;

    dialog.afterClosed().subscribe((val) => {
      if (val) {
        let index = this.newData.findIndex((val: {
          contact: any;
        }) => val.contact === this.selectedRow.contact)

        // console.log(index)
        this.newData[index] = val;
        this.selectedRow = val;
        // console.log("check", val);
      }
    })
  }

  onPageChange(ev: PageEvent): void {
    // console.log(ev);
    this.limit = ev.pageSize;
    this.offSet = (ev.pageSize * (ev.pageIndex + 1));
    this.filterData();
  }

  filterData() {
    this.newData = this.data.filter((val, idx) => {
      if ((idx) > (this.offSet - (this.limit + 1)) && (idx < this.offSet && (idx) < (this.data.length))) {
        return val;
      }
    })
  }

  onSearchData(): void {
    const searchKey = this.searchField.value;
    this.newData = this.data.filter((d, idx) => {
      // console.log("check");

      if (idx < this.limit) {
        return d && d.company.toLowerCase().includes(searchKey);
      } else {
        console.log(this.msg);
      }
    });
  }

  onSort(): void {
    this.onSortFunction();
  }
  onSortFunction(): void {
    this.newData = this.data.filter((val, idx) => {
      if (idx < this.limit)
        return val;
      if (!this.order) {
        this.newData = this.data.sort((a, b) => {
          return a.id - b.id;
        });

      } else {
        this.newData = this.data.sort((a, b) => {
          return b.id - a.id;
        });
      }
      this.order = !this.order;
      console.log(this.order);
    })
  }

  delete() {
    const findRec = this.newData.findIndex((rec: {
      id: any;
    }) => rec.id == this.selectedRow.id)
    this.newData.splice(findRec, 1);
    this.selectedRow = null;
  }
}
