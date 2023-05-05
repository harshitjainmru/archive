import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { rejects } from "assert";
import { resolve } from "dns";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
}
