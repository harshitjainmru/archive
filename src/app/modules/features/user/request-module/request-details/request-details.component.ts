import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-request-details",
  templateUrl: "./request-details.component.html",
  styleUrls: ["./request-details.component.scss"],
})
export class RequestDetailsComponent implements OnInit {
  documents = [];
  constructor(
    public dialogRef: MatDialogRef<RequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this.data.attachment.forEach((element: string) => {
      const type = element.split(".");
      console.log(type);

      const fileName = `${type[type.length - 2].split("/")[1]}.${
        type[type.length - 1]
      }`;
      const obj = {
        url: element,
        file: null,
        name: fileName,
        type: type[type.length - 1],
      };
      this.documents.push(obj);

      // this.docsFormArray.push(singleImageGroup);
      // console.log("kokok", this.docsFormArray);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openUrl(item) {
    window.open(item.url);
  }
}
