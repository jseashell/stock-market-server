import { FeedPost } from './feed-post.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedRepository {
  feed: FeedPost[] = [
    {
      title: 'Amid the Capitol riot, Facebook faced its own insurrection',
      text: 'New internal documents provided by former Facebook employee-turned-whistleblower Frances Haugen provide a rare glimpse into how the company, after years under the microscope for the policing of its platform, appears to have simply stumbled into the Jan. 6 riot',
    },
    {
      title: 'Aromatherapy spray linked to US deaths faces recall',
      text: 'U.S. health officials may have solved the mystery of how four people in different states came down with a serious tropical disease, even though none had traveled internationally',
    },
    {
      title: 'Climate change disrupting natural cycles at drier Lake Tahoe',
      text: 'Drought fueled by climate change has dropped Lake Tahoe below its natural rim and halted flows into the Truckee River',
    },
    {
      title: "Jury gets chance to hear Elizabeth Holmes' bold promises",
      text: 'A jury weighing the fate of fallen Silicon Valley star Elizabeth Holmes has had its first chance to listen to recordings of her boasting to investors about purported breakthroughs in blood-testing technology',
    },
    {
      title: 'Where are the workers? Cutoff of jobless aid spurs no influx',
      text: 'Earlier this year, an insistent cry arose from business leaders and Republican governors: Cut off a $300-a-week federal supplement for unemployed Americans',
    },
    {
      title: 'California proposes limits on community drilling',
      text: 'Regulators ambitious plan to block new oil and gas wells within 3,200 feet of schools and homes is far from finalized',
    },
    {
      title: 'Court: Turkish Halkbank to be charged in Iran sanctions case',
      text: 'A federal appeals court says a Turkish bank must face criminal charges that it evaded sanctions against Iran by processing billions of dollars of Iranian oil revenue',
    },
    {
      title: 'Pfizer says COVID-19 vaccine more than 90% effective in kids',
      text: 'Pfizer says kid-size doses of its COVID-19 vaccine are safe and nearly 91% effective at preventing symptomatic infections in elementary schoolchildren',
    },
    {
      title: 'Giuliani associate convicted of campaign finance crimes',
      text: 'A New York jury has convicted a former associate of Rudy Giuliani of charges that he made illegal campaign contributions to influence U.S. politicians and advance his business interests',
    },
    {
      title: 'Big tech data centers spark worry over scarce Western water',
      text: 'Conflicts over water are as old as history itself, but the massive Google data centers on the edge of a small Oregon town represent an emerging 21st century concern',
    },
    {
      title: 'Stocks end mixed on Wall Street, still notch weekly gains',
      text: 'Stocks ended up with a mixed finish on Wall Street Friday after another choppy day of trading, but major indexes still marked their third weekly gains in a row',
    },
    {
      title: 'Lyft report: Sexual assaults rose sharply in recent years',
      text: 'Ride-hailing company Lyft says more than 1,800 sexual assaults were reported by riders in 2019, and the number of incidents has been rising sharply in recent years',
    },
    {
      title: 'MarketBeat: Week in Review 10/18 – 10/22',
      text: 'Initial signs indicate that earnings may be stronger than expected. Next week the number of companies reporting ramps up and that along with a key read on inflation may change the bullish narrative. You can count on the MarketBeat team to identify and analyze the stocks and the stories that are moving the market.',
    },
    {
      title: 'How major US stock indexes fared Friday',
      text: 'Stocks ended up with a mixed finish on Wall Street Friday after another choppy day of trading, but major indexes still marked their third weekly gains in a row',
    },
    {
      title: 'Snap, Intel fall; American Express, Mattel rise',
      text: 'Stocks that traded heavily or had substantial price changes Friday: Snap, Intel fall; American Express, Mattel rise',
    },
    {
      title: 'Powell says inflation risks rising, but Fed can be "patient"',
      text: 'Federal Reserve Chair Jerome Powell says the tangled supply chains and shortages that have bedeviled the U.S. economy since this summer have gotten worse and will likely keep inflation elevated well into next year',
    },
    {
      title: 'On Nov. 1, no GM plants will be closed due to chip shortage',
      text: 'For the first time in eight months, the global shortage of computer chips won’t force General Motors to close any North American factories',
    },
    {
      title: 'US budget deficit hits $2.77 trillion in 2021, 2nd highest',
      text: 'The U.S. budget deficit totaled $2.77 trillion for 2021, the second highest on record but an improvement from the all-time high of $3.13 trillion in 2020',
    },
    {
      title: 'Watchdog finds flaws in FAA oversight of American Airlines',
      text: 'A government watchdog says federal regulators often fail to get to the bottom of maintenance issues at American Airlines',
    },
    {
      title: 'Stocks edge lower, major indexes still head for weekly gains',
      text: 'Major stock indexes on Wall Street are mostly lower in afternoon trading Friday as losses for several large technology and communications companies weigh on the market',
    },
    {
      title: 'Justice Department to expand redlining investigation efforts',
      text: 'The Justice Department has announced a cross-government effort to investigate and prosecute redlining, the practice of banks discriminating against racial minorities or certain neighborhoods',
    },
    {
      title: 'Alabama: App may help cut long stadium food, drink lines',
      text: 'The University of Alabama has contracted with an online app in response to complaints over long concession lines at home football games during the coronavirus pandemic',
    },
  ];

  count(): number {
    return this.feed.length;
  }

  get(i: number): FeedPost {
    return this.feed[i];
  }
}
