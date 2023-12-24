import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetDataService } from '../../service';
import { City } from '../../model';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrl: './page-search.component.sass',
})
export class PageSearchComponent implements OnInit {
  @ViewChild('suggestionTemplate', { static: true })
  public suggestionTemplate!: ElementRef;

  public cities: City[] = [];
  public searchInput: string = '';

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((res) => {
      this.cities = res;
    });
  }

  public findMatches(wordToMatch: string) {
    return this.cities.filter((place) => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  public numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public displayMatches(): City[] {
    const matchArray = this.findMatches(this.searchInput);
    return matchArray;
    // const html = matchArray
    //   .map((place) => {
    //     const regex = new RegExp(this.searchInput, 'gi');
    //     const cityName = place.city.replace(
    //       regex,
    //       `<span class="hl">${this.searchInput}</span>`
    //     );
    //     const stateName = place.state.replace(
    //       regex,
    //       `<span class="hl">${this.searchInput}</span>`
    //     );
    //     return `
    //   <li class="suggestion">
    //     <span class="name">${cityName}, ${stateName}</span>
    //     <span class="population">${this.numberWithCommas(
    //       place.population
    //     )}</span>
    //   </li>
    // `;
    //   })
    //   .join('');
    // this.suggestionTemplate.nativeElement.innerHTML = html;
  }
}
