import {
  Directive,
  Host,
  Optional,
  Renderer2,
  Self,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";

@Directive({
  selector: "[appStylePagination]",
})
export class StylePaginationDirective {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public directiveLoaded = false;

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {}

  ngAfterViewInit() {
    this.initPageRange();
  }

  nextP = `<svg xmlns="http://www.w3.org/2000/svg" width="67" height="24" fill="none" viewBox="0 0 67 24">
  <path fill="#14B1BD" d="M10.752 6.536V18h-.776c-.123 0-.227-.021-.312-.064-.08-.043-.16-.115-.24-.216L2.792 9.08c.01.133.019.264.024.392.005.128.008.248.008.36V18h-1.36V6.536h.8c.07 0 .128.005.176.016.048.005.09.019.128.04.037.016.075.043.112.08.037.032.077.075.12.128l6.632 8.632c-.01-.139-.021-.272-.032-.4-.005-.133-.008-.259-.008-.376v-8.12h1.36zm7.769 6.528c0-.33-.048-.632-.144-.904-.09-.277-.227-.515-.408-.712-.176-.203-.392-.357-.648-.464-.256-.112-.547-.168-.872-.168-.683 0-1.224.2-1.624.6-.395.395-.64.944-.736 1.648h4.432zm1.152 3.8c-.176.213-.387.4-.632.56-.246.155-.51.283-.792.384-.278.101-.566.176-.864.224-.299.053-.595.08-.888.08-.56 0-1.078-.093-1.552-.28-.47-.192-.878-.47-1.224-.832-.342-.368-.608-.821-.8-1.36-.192-.539-.288-1.157-.288-1.856 0-.565.085-1.093.256-1.584.176-.49.426-.915.752-1.272.325-.363.722-.645 1.192-.848.47-.208.997-.312 1.584-.312.485 0 .933.083 1.344.248.416.16.773.395 1.072.704.304.304.541.683.712 1.136.17.448.256.96.256 1.536 0 .224-.024.373-.072.448-.048.075-.139.112-.272.112H14.04c.016.512.085.957.208 1.336.128.379.304.696.528.952.224.25.49.44.8.568.31.123.656.184 1.04.184.357 0 .664-.04.92-.12.261-.085.485-.176.672-.272.186-.096.341-.184.464-.264.128-.085.237-.128.328-.128.117 0 .208.045.272.136l.4.52zM28.097 18h-1.369c-.117 0-.21-.03-.28-.088-.064-.064-.117-.133-.16-.208l-2.04-3.176c-.02.075-.045.15-.072.224-.02.07-.053.133-.095.192l-1.889 2.76c-.053.075-.111.144-.175.208-.06.059-.142.088-.248.088h-1.272l2.84-4.16-2.729-3.944h1.369c.117 0 .202.019.256.056.053.037.1.09.143.16l1.992 3.04c.043-.155.11-.304.2-.448l1.744-2.56c.048-.075.1-.133.152-.176.06-.048.129-.072.209-.072h1.312l-2.729 3.872L28.096 18zm3.8.128c-.64 0-1.133-.179-1.48-.536-.341-.357-.512-.872-.512-1.544v-4.96h-.976c-.085 0-.157-.024-.216-.072-.058-.053-.088-.133-.088-.24v-.568l1.328-.168.328-2.504c.016-.08.05-.144.104-.192.059-.053.134-.08.224-.08h.72v2.792h2.344v1.032H31.33v4.864c0 .341.083.595.248.76.166.165.379.248.64.248.15 0 .278-.019.384-.056.112-.043.208-.088.288-.136.08-.048.147-.09.2-.128.059-.043.11-.064.152-.064.075 0 .142.045.2.136l.416.68c-.245.23-.541.41-.888.544-.346.128-.704.192-1.072.192z"/>
  <path stroke="#14B1BD" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M55 18l6-6-6-6M48 18l6-6-6-6"/>
</svg>`;
  previousP = `<svg xmlns="http://www.w3.org/2000/svg" width="93" height="24" fill="none" viewBox="0 0 93 24">
  <path stroke="#14B1BD" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18l-6-6 6-6M19 18l-6-6 6-6"/>
  <path fill="#14B1BD" d="M36.848 12.48c.443 0 .832-.059 1.168-.176.341-.117.627-.28.856-.488.235-.213.41-.467.528-.76.117-.293.176-.616.176-.968 0-.73-.227-1.301-.68-1.712-.448-.41-1.13-.616-2.048-.616h-1.84v4.72h1.84zm0-5.944c.725 0 1.355.085 1.888.256.539.165.984.403 1.336.712.352.31.613.683.784 1.12.176.437.264.925.264 1.464 0 .533-.093 1.021-.28 1.464-.187.443-.461.824-.824 1.144-.357.32-.803.57-1.336.752-.528.176-1.139.264-1.832.264h-1.84V18h-1.544V6.536h3.384zm7.085 4.984c.256-.555.57-.987.944-1.296.373-.315.83-.472 1.368-.472.17 0 .334.019.488.056.16.037.302.096.424.176l-.104 1.064c-.032.133-.112.2-.24.2-.075 0-.184-.016-.328-.048-.144-.032-.306-.048-.488-.048-.256 0-.485.037-.688.112-.197.075-.376.187-.536.336-.155.144-.296.325-.424.544-.122.213-.234.459-.336.736V18h-1.432V9.896h.816c.155 0 .261.03.32.088.059.059.099.16.12.304l.096 1.232zm9.572 1.544c0-.33-.048-.632-.144-.904-.09-.277-.226-.515-.408-.712-.176-.203-.392-.357-.648-.464-.256-.112-.547-.168-.872-.168-.682 0-1.224.2-1.624.6-.395.395-.64.944-.736 1.648h4.432zm1.152 3.8c-.176.213-.386.4-.632.56-.245.155-.51.283-.792.384-.277.101-.565.176-.864.224-.298.053-.594.08-.888.08-.56 0-1.077-.093-1.552-.28-.47-.192-.877-.47-1.224-.832-.341-.368-.608-.821-.8-1.36-.192-.539-.288-1.157-.288-1.856 0-.565.086-1.093.256-1.584.176-.49.427-.915.752-1.272.325-.363.723-.645 1.192-.848.47-.208.998-.312 1.584-.312.485 0 .933.083 1.344.248.416.16.774.395 1.072.704.304.304.541.683.712 1.136.17.448.256.96.256 1.536 0 .224-.024.373-.072.448-.048.075-.139.112-.272.112h-5.416c.016.512.086.957.208 1.336.128.379.304.696.528.952.224.25.49.44.8.568.31.123.656.184 1.04.184.358 0 .664-.04.92-.12.261-.085.486-.176.672-.272.187-.096.342-.184.464-.264.128-.085.238-.128.328-.128.117 0 .208.045.272.136l.4.52zm8.65-6.968L60.001 18h-1.28l-3.304-8.104h1.16c.118 0 .214.03.288.088.075.059.126.128.152.208l2.056 5.216c.064.197.12.39.168.576.048.187.094.373.136.56.043-.187.088-.373.136-.56.048-.187.107-.379.176-.576l2.08-5.216c.032-.085.086-.155.16-.208.075-.059.163-.088.264-.088h1.112zm2.81 0V18h-1.425V9.896h1.424zm.303-2.544c0 .139-.029.27-.088.392-.053.117-.128.224-.224.32-.09.09-.2.163-.328.216-.122.053-.253.08-.392.08-.138 0-.269-.027-.392-.08-.117-.053-.221-.125-.312-.216-.09-.096-.162-.203-.216-.32-.053-.123-.08-.253-.08-.392s.027-.27.08-.392c.054-.128.126-.237.216-.328.091-.096.195-.17.312-.224.123-.053.254-.08.392-.08.139 0 .27.027.392.08.128.053.238.128.328.224.096.09.171.2.224.328.059.123.088.253.088.392zm5.452 2.416c.592 0 1.126.099 1.6.296.475.197.88.477 1.216.84.336.363.592.803.768 1.32.181.512.272 1.085.272 1.72 0 .64-.09 1.216-.272 1.728-.176.512-.432.95-.768 1.312-.336.363-.741.643-1.216.84-.474.192-1.008.288-1.6.288-.597 0-1.136-.096-1.616-.288-.475-.197-.88-.477-1.216-.84-.336-.363-.595-.8-.776-1.312-.176-.512-.264-1.088-.264-1.728 0-.635.088-1.208.264-1.72.181-.517.44-.957.776-1.32.336-.363.741-.643 1.216-.84.48-.197 1.019-.296 1.616-.296zm0 7.232c.8 0 1.397-.267 1.792-.8.395-.539.592-1.288.592-2.248 0-.965-.197-1.717-.592-2.256-.395-.539-.992-.808-1.792-.808-.405 0-.76.07-1.064.208-.299.139-.55.339-.752.6-.197.261-.346.584-.448.968-.096.379-.144.808-.144 1.288 0 .96.198 1.71.592 2.248.4.533 1.005.8 1.816.8zm12.326-7.104V18h-.848c-.202 0-.33-.099-.384-.296l-.112-.872c-.352.39-.746.704-1.184.944-.437.235-.938.352-1.504.352-.442 0-.834-.072-1.176-.216-.336-.15-.618-.357-.848-.624-.23-.267-.402-.59-.52-.968-.112-.379-.168-.797-.168-1.256V9.896h1.424v5.168c0 .613.139 1.088.416 1.424.283.336.712.504 1.288.504.422 0 .814-.099 1.176-.296.368-.203.707-.48 1.016-.832V9.896h1.424zm6.978 1.336c-.064.117-.163.176-.296.176-.08 0-.17-.03-.272-.088-.101-.059-.227-.123-.376-.192-.144-.075-.317-.141-.52-.2-.203-.064-.443-.096-.72-.096-.24 0-.456.032-.648.096-.192.059-.357.141-.496.248-.133.107-.237.232-.312.376-.07.139-.104.29-.104.456 0 .208.059.381.176.52.123.139.283.259.48.36.198.101.422.192.672.272.25.075.507.157.768.248.267.085.525.181.776.288.25.107.475.24.672.4.198.16.355.357.472.592.123.23.184.507.184.832 0 .373-.067.72-.2 1.04-.133.315-.33.59-.592.824-.261.23-.581.41-.96.544-.379.133-.816.2-1.312.2-.565 0-1.077-.09-1.536-.272-.459-.187-.848-.424-1.168-.712l.336-.544c.043-.07.093-.123.152-.16.059-.037.133-.056.224-.056.096 0 .198.037.304.112.107.075.235.157.384.248.155.09.342.173.56.248.219.075.49.112.816.112.278 0 .52-.035.728-.104.208-.075.382-.173.52-.296.139-.123.24-.264.304-.424.07-.16.104-.33.104-.512 0-.224-.061-.408-.184-.552-.117-.15-.274-.275-.472-.376-.197-.107-.424-.197-.68-.272l-.776-.248c-.261-.085-.52-.181-.776-.288-.25-.112-.475-.25-.672-.416-.197-.165-.357-.368-.48-.608-.117-.245-.176-.541-.176-.888 0-.31.064-.605.192-.888.128-.288.315-.539.56-.752.246-.219.547-.392.904-.52.358-.128.765-.192 1.224-.192.534 0 1.01.085 1.432.256.427.165.795.395 1.104.688l-.32.52z"/>
</svg>
`;

  private initPageRange(): void {
    // set the style for previous button
    const previousButtonNode = this.vr.element.nativeElement.querySelector(
      "button.mat-paginator-navigation-previous"
    );
    // this.ren.setStyle(previousButtonNode, "margin", "20px");

    const previousLabel = previousButtonNode.childNodes[0];
    this.ren.setProperty(previousLabel, "innerHTML", `${this.previousP}`);
    this.ren.setStyle(previousLabel, "color", "#14B1BD");

    // set the style for next button
    const nextButtonNode = this.vr.element.nativeElement.querySelector(
      "button.mat-paginator-navigation-next"
    );
    // this.ren.setStyle(nextButtonNode, "margin", "20px");

    const nextLabel = nextButtonNode.childNodes[0];
    this.ren.setProperty(nextLabel, "innerHTML", `${this.nextP}`);
    this.ren.setStyle(nextLabel, "color", "#14B1BD");
    console.log("came");
    // this.ren.setStyle(nextLabel, "margin-left", "50px");
  }
}
