const XLSX = require('xlsx');

(async () => {
  /* fetch JSON data and parse */
  const url = 'https://sheetjs.com/data/executive.json';
  const raw_data = await (await fetch(url)).json();

  console.log(raw_data[0]['name']);

  const raw_data__ = `
  [
  {
    "id": {
      "bioguide": "W000178",
      "govtrack": 411351,
      "icpsr_prez": 99869
    },
    "name": {
      "first": "George",
      "last": "Washington"
    },
    "bio": {
      "birthday": "1732-02-22",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1789-04-30",
        "end": "1793-03-04",
        "party": "no party",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1793-03-04",
        "end": "1797-03-04",
        "party": "no party",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "A000039",
      "govtrack": 400699,
      "icpsr_prez": 99870
    },
    "name": {
      "first": "John",
      "last": "Adams"
    },
    "bio": {
      "birthday": "1735-10-19",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1789-04-21",
        "end": "1793-03-04",
        "party": "Federalist",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1793-03-04",
        "end": "1797-03-04",
        "party": "Federalist",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1797-03-04",
        "end": "1801-03-04",
        "party": "Federalist",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "J000069",
      "govtrack": 405974,
      "icpsr_prez": 99871
    },
    "name": {
      "first": "Thomas",
      "last": "Jefferson"
    },
    "bio": {
      "birthday": "1743-04-13",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1797-03-04",
        "end": "1801-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1801-03-04",
        "end": "1805-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1805-03-04",
        "end": "1809-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B001133",
      "govtrack": 402077,
      "icpsr": 1302
    },
    "name": {
      "first": "Aaron",
      "last": "Burr",
      "suffix": "Jr."
    },
    "bio": {
      "birthday": "1756-02-06",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1801-03-04",
        "end": "1805-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C000527",
      "govtrack": 412587
    },
    "name": {
      "first": "George",
      "last": "Clinton"
    },
    "bio": {
      "birthday": "1739-07-26",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1805-03-04",
        "end": "1809-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1809-03-04",
        "end": "1812-04-20",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "G000139",
      "govtrack": 404507,
      "icpsr": 3541
    },
    "name": {
      "first": "Elbridge",
      "last": "Gerry"
    },
    "bio": {
      "birthday": "1744-07-17",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1813-03-04",
        "end": "1814-11-23",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M000043",
      "govtrack": 407071,
      "icpsr": 5903,
      "icpsr_prez": 99872
    },
    "name": {
      "first": "James",
      "last": "Madison"
    },
    "bio": {
      "birthday": "1751-03-16",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1809-03-04",
        "end": "1813-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1813-03-04",
        "end": "1817-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "T000306",
      "govtrack": 412588
    },
    "name": {
      "first": "Daniel",
      "middle": "D.",
      "last": "Tompkins"
    },
    "bio": {
      "birthday": "1774-06-21",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1817-03-04",
        "end": "1821-03-05",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1821-03-05",
        "end": "1825-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M000858",
      "govtrack": 407829,
      "icpsr": 6594,
      "icpsr_prez": 99873
    },
    "name": {
      "first": "James",
      "last": "Monroe"
    },
    "bio": {
      "birthday": "1758-04-28",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1817-03-04",
        "end": "1821-03-05",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1821-03-05",
        "end": "1825-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "A000041",
      "govtrack": 400702,
      "icpsr": 34,
      "icpsr_prez": 99874
    },
    "name": {
      "first": "John",
      "middle": "Quincy",
      "last": "Adams"
    },
    "bio": {
      "birthday": "1767-07-11",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1825-03-04",
        "end": "1829-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C000044",
      "govtrack": 402205,
      "icpsr": 1418
    },
    "name": {
      "first": "John",
      "middle": "Caldwell",
      "last": "Calhoun"
    },
    "bio": {
      "birthday": "1782-03-18",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1825-03-04",
        "end": "1829-03-04",
        "party": "Democratic-Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1829-03-04",
        "end": "1832-12-28",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "J000005",
      "govtrack": 405913,
      "icpsr": 4843,
      "icpsr_prez": 99875
    },
    "name": {
      "first": "Andrew",
      "last": "Jackson"
    },
    "bio": {
      "birthday": "1767-03-15",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1829-03-04",
        "end": "1833-03-04",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1833-03-04",
        "end": "1837-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "J000170",
      "govtrack": 406067,
      "icpsr": 4988
    },
    "name": {
      "first": "Richard",
      "middle": "Mentor",
      "last": "Johnson"
    },
    "bio": {
      "birthday": "1780-10-17",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1837-03-04",
        "end": "1841-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "V000009",
      "govtrack": 411074,
      "icpsr": 9595,
      "icpsr_prez": 99876
    },
    "name": {
      "first": "Martin",
      "last": "Van Buren"
    },
    "bio": {
      "birthday": "1782-12-05",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1833-03-04",
        "end": "1837-03-04",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1837-03-04",
        "end": "1841-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000279",
      "govtrack": 405153,
      "icpsr": 4138,
      "icpsr_prez": 99877
    },
    "name": {
      "first": "William",
      "middle": "Henry",
      "last": "Harrison"
    },
    "bio": {
      "birthday": "1773-02-09",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1841-03-04",
        "end": "1841-04-04",
        "party": "Whig",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "T000450",
      "govtrack": 411018,
      "icpsr": 9542,
      "icpsr_prez": 99878
    },
    "name": {
      "first": "John",
      "last": "Tyler"
    },
    "bio": {
      "birthday": "1790-03-29",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1841-03-04",
        "end": "1841-04-04",
        "party": "Whig",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1841-04-04",
        "end": "1845-03-04",
        "party": "Whig",
        "how": "succession"
      }
    ]
  },
  {
    "id": {
      "bioguide": "D000011",
      "govtrack": 403154,
      "icpsr": 2305
    },
    "name": {
      "first": "George",
      "middle": "Mifflin",
      "last": "Dallas"
    },
    "bio": {
      "birthday": "1792-07-10",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1845-03-04",
        "end": "1849-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "P000409",
      "govtrack": 408802,
      "icpsr": 7507,
      "icpsr_prez": 99879
    },
    "name": {
      "first": "James",
      "middle": "Knox",
      "last": "Polk"
    },
    "bio": {
      "birthday": "1795-11-02",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1845-03-04",
        "end": "1849-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412344,
      "icpsr_prez": 99880
    },
    "name": {
      "first": "Zachary",
      "last": "Taylor"
    },
    "bio": {
      "birthday": "1784-11-24",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1849-03-04",
        "end": "1850-07-09",
        "party": "Whig",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "F000115",
      "govtrack": 404072,
      "icpsr": 3140,
      "icpsr_prez": 99881
    },
    "name": {
      "first": "Millard",
      "last": "Fillmore"
    },
    "bio": {
      "birthday": "1800-01-07",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1849-03-04",
        "end": "1850-07-09",
        "party": "Whig",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1850-07-09",
        "end": "1853-03-04",
        "party": "Whig",
        "how": "succession"
      }
    ]
  },
  {
    "id": {
      "bioguide": "K000217",
      "govtrack": 406377,
      "icpsr": 5275
    },
    "name": {
      "first": "William",
      "middle": "Rufus de Vane",
      "last": "King"
    },
    "bio": {
      "birthday": "1786-04-07",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1853-03-04",
        "end": "1853-04-18",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "P000333",
      "govtrack": 408730,
      "icpsr": 7435,
      "icpsr_prez": 99882
    },
    "name": {
      "first": "Franklin",
      "last": "Pierce"
    },
    "bio": {
      "birthday": "1804-11-23",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1853-03-04",
        "end": "1857-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B000789",
      "govtrack": 401746,
      "icpsr": 995,
      "icpsr_prez": 99883
    },
    "name": {
      "first": "John",
      "middle": "Cabell",
      "last": "Breckinridge"
    },
    "bio": {
      "birthday": "1821-01-16",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1857-03-04",
        "end": "1861-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B001005",
      "govtrack": 401954,
      "icpsr": 1186,
      "icpsr_prez": 99883
    },
    "name": {
      "first": "James",
      "last": "Buchanan"
    },
    "bio": {
      "birthday": "1791-04-23",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1857-03-04",
        "end": "1861-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000121",
      "govtrack": 405003,
      "icpsr": 4001
    },
    "name": {
      "first": "Hannibal",
      "last": "Hamlin"
    },
    "bio": {
      "birthday": "1809-08-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1861-03-04",
        "end": "1865-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "L000313",
      "govtrack": 406807,
      "icpsr": 5666,
      "icpsr_prez": 99884
    },
    "name": {
      "first": "Abraham",
      "last": "Lincoln"
    },
    "bio": {
      "birthday": "1809-02-12",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1861-03-04",
        "end": "1865-03-04",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1865-03-04",
        "end": "1865-04-15",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "J000116",
      "govtrack": 406017,
      "icpsr": 4940,
      "icpsr_prez": 99885
    },
    "name": {
      "first": "Andrew",
      "last": "Johnson"
    },
    "bio": {
      "birthday": "1808-12-29",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1865-03-04",
        "end": "1865-04-15",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1865-04-15",
        "end": "1869-03-04",
        "party": "Democratic",
        "how": "succession"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C000626",
      "govtrack": 402755,
      "icpsr": 1938
    },
    "name": {
      "first": "Schuyler",
      "last": "Colfax"
    },
    "bio": {
      "birthday": "1823-03-23",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1869-03-04",
        "end": "1873-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "W000585",
      "govtrack": 411739,
      "icpsr": 10225
    },
    "name": {
      "first": "Henry",
      "last": "Wilson"
    },
    "bio": {
      "birthday": "1812-02-16",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1873-03-04",
        "end": "1875-11-22",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412350,
      "icpsr_prez": 99886
    },
    "name": {
      "first": "Ulysses",
      "middle": "Simpson",
      "last": "Grant"
    },
    "bio": {
      "birthday": "1822-04-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1869-03-04",
        "end": "1873-03-04",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1873-03-04",
        "end": "1877-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "W000341",
      "govtrack": 411503,
      "icpsr": 9995
    },
    "name": {
      "first": "William",
      "middle": "Almon",
      "last": "Wheeler"
    },
    "bio": {
      "birthday": "1819-06-30",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1877-03-04",
        "end": "1881-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000393",
      "govtrack": 405261,
      "icpsr": 4232,
      "icpsr_prez": 99887
    },
    "name": {
      "first": "Rutherford",
      "middle": "Birchard",
      "last": "Hayes"
    },
    "bio": {
      "birthday": "1822-10-04",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1877-03-04",
        "end": "1881-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "G000063",
      "govtrack": 404436,
      "icpsr": 3473,
      "icpsr_prez": 99888
    },
    "name": {
      "first": "James",
      "middle": "Abram",
      "last": "Garfield"
    },
    "bio": {
      "birthday": "1831-11-19",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1881-03-04",
        "end": "1881-09-19",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "A000303",
      "govtrack": 400945,
      "icpsr_prez": 99889
    },
    "name": {
      "first": "Chester",
      "middle": "Alan",
      "last": "Arthur"
    },
    "bio": {
      "birthday": "1829-10-05",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1881-03-04",
        "end": "1881-09-19",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1881-09-19",
        "end": "1885-03-04",
        "party": "Republican",
        "how": "succession"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000493",
      "govtrack": 405356,
      "icpsr": 4319
    },
    "name": {
      "first": "Thomas",
      "middle": "Andrews",
      "last": "Hendricks"
    },
    "bio": {
      "birthday": "1819-09-07",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1885-03-04",
        "end": "1885-11-25",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M001018",
      "govtrack": 407985,
      "icpsr": 6742
    },
    "name": {
      "first": "Levi",
      "middle": "Parsons",
      "last": "Morton"
    },
    "bio": {
      "birthday": "1824-05-16",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1889-03-04",
        "end": "1893-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000263",
      "govtrack": 405139,
      "icpsr": 4124,
      "icpsr_prez": 99891
    },
    "name": {
      "first": "Benjamin",
      "last": "Harrison"
    },
    "bio": {
      "birthday": "1833-08-20",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1889-03-04",
        "end": "1893-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "S000889",
      "govtrack": 410350,
      "icpsr": 8918
    },
    "name": {
      "first": "Adlai",
      "middle": "Ewing",
      "last": "Stevenson"
    },
    "bio": {
      "birthday": "1835-10-23",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1893-03-04",
        "end": "1897-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412354,
      "icpsr_prez": 99890
    },
    "name": {
      "first": "Grover",
      "last": "Cleveland"
    },
    "bio": {
      "birthday": "1837-03-18",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1885-03-04",
        "end": "1889-03-04",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1893-03-04",
        "end": "1897-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000660",
      "govtrack": 412589
    },
    "name": {
      "first": "Garret",
      "middle": "Augustus",
      "last": "Hobart"
    },
    "bio": {
      "birthday": "1844-06-03",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1897-03-04",
        "end": "1899-11-21",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M000522",
      "govtrack": 407515,
      "icpsr": 6312,
      "icpsr_prez": 99892
    },
    "name": {
      "first": "William",
      "last": "McKinley",
      "suffix": "Jr."
    },
    "bio": {
      "birthday": "1843-01-29",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1897-03-04",
        "end": "1901-03-04",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1901-03-04",
        "end": "1901-09-14",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "F000003",
      "govtrack": 403965,
      "icpsr": 3046
    },
    "name": {
      "first": "Charles",
      "middle": "Warren",
      "last": "Fairbanks"
    },
    "bio": {
      "birthday": "1852-05-11",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1905-03-04",
        "end": "1909-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "R000429",
      "govtrack": 409394,
      "icpsr_prez": 99893
    },
    "name": {
      "first": "Theodore",
      "last": "Roosevelt"
    },
    "bio": {
      "birthday": "1858-10-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1901-03-04",
        "end": "1901-09-14",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1901-09-14",
        "end": "1905-03-04",
        "party": "Republican",
        "how": "succession"
      },
      {
        "type": "prez",
        "start": "1905-03-04",
        "end": "1909-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "S000345",
      "govtrack": 409841,
      "icpsr": 8453
    },
    "name": {
      "first": "James",
      "middle": "Schoolcraft",
      "last": "Sherman"
    },
    "bio": {
      "birthday": "1855-10-24",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1909-03-04",
        "end": "1912-10-30",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412359,
      "icpsr_prez": 99894
    },
    "name": {
      "first": "William",
      "middle": "Howard",
      "last": "Taft"
    },
    "bio": {
      "birthday": "1857-09-15",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1909-03-04",
        "end": "1913-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M000164",
      "govtrack": 412590
    },
    "name": {
      "first": "Thomas",
      "middle": "Riley",
      "last": "Marshall"
    },
    "bio": {
      "birthday": "1854-03-14",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1913-03-04",
        "end": "1917-03-04",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1917-03-04",
        "end": "1921-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412360,
      "icpsr_prez": 99895
    },
    "name": {
      "first": "Woodrow",
      "last": "Wilson"
    },
    "bio": {
      "birthday": "1856-12-28",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1913-03-04",
        "end": "1917-03-04",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1917-03-04",
        "end": "1921-03-04",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000192",
      "govtrack": 405073,
      "icpsr": 4059,
      "icpsr_prez": 99896
    },
    "name": {
      "first": "Warren",
      "middle": "Gamaliel",
      "last": "Harding"
    },
    "bio": {
      "birthday": "1865-11-02",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1921-03-04",
        "end": "1923-08-02",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "D000147",
      "govtrack": 412591
    },
    "name": {
      "first": "Charles",
      "middle": "Gates",
      "last": "Dawes"
    },
    "bio": {
      "birthday": "1865-08-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1925-03-04",
        "end": "1929-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C000738",
      "govtrack": 402859,
      "icpsr_prez": 99897
    },
    "name": {
      "first": "Calvin",
      "last": "Coolidge"
    },
    "bio": {
      "birthday": "1872-07-04",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1921-03-04",
        "end": "1923-08-02",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1923-08-02",
        "end": "1925-03-04",
        "party": "Republican",
        "how": "succession"
      },
      {
        "type": "prez",
        "start": "1925-03-04",
        "end": "1929-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C001008",
      "govtrack": 403115,
      "icpsr": 2269
    },
    "name": {
      "first": "Charles",
      "last": "Curtis"
    },
    "bio": {
      "birthday": "1860-01-25",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1929-03-04",
        "end": "1933-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412363,
      "icpsr_prez": 99898
    },
    "name": {
      "first": "Herbert",
      "middle": "Clark",
      "last": "Hoover"
    },
    "bio": {
      "birthday": "1874-08-10",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1929-03-04",
        "end": "1933-03-04",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "G000074",
      "govtrack": 404446,
      "icpsr": 3482
    },
    "name": {
      "first": "John",
      "middle": "Nance",
      "last": "Garner"
    },
    "bio": {
      "birthday": "1868-11-22",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1933-03-04",
        "end": "1937-01-20",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1937-01-20",
        "end": "1941-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "W000077",
      "govtrack": 412592
    },
    "name": {
      "first": "Henry",
      "middle": "Agard",
      "last": "Wallace"
    },
    "bio": {
      "birthday": "1888-10-07",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1941-01-20",
        "end": "1945-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412364,
      "icpsr_prez": 99899
    },
    "name": {
      "first": "Franklin",
      "middle": "Delano",
      "last": "Roosevelt"
    },
    "bio": {
      "birthday": "1882-01-30",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1933-03-04",
        "end": "1937-01-20",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1937-01-20",
        "end": "1941-01-20",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1941-01-20",
        "end": "1945-01-20",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1945-01-20",
        "end": "1945-04-12",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B000145",
      "govtrack": 401146,
      "icpsr": 437
    },
    "name": {
      "first": "Alben",
      "middle": "William",
      "last": "Barkley"
    },
    "bio": {
      "birthday": "1877-11-24",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1949-01-20",
        "end": "1953-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "T000387",
      "govtrack": 410956,
      "icpsr": 9487,
      "icpsr_prez": 99900
    },
    "name": {
      "first": "Harry",
      "middle": "S.",
      "last": "Truman"
    },
    "bio": {
      "birthday": "1884-05-08",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1945-01-20",
        "end": "1945-04-12",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1945-04-12",
        "end": "1949-01-20",
        "party": "Democratic",
        "how": "succession"
      },
      {
        "type": "prez",
        "start": "1949-01-20",
        "end": "1953-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412366,
      "icpsr_prez": 99901
    },
    "name": {
      "first": "Dwight",
      "middle": "David",
      "last": "Eisenhower"
    },
    "bio": {
      "birthday": "1890-10-14",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1953-01-20",
        "end": "1957-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1957-01-20",
        "end": "1961-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "K000107",
      "govtrack": 406274,
      "icpsr": 5180,
      "icpsr_prez": 99902
    },
    "name": {
      "first": "John",
      "middle": "Fitzgerald",
      "last": "Kennedy"
    },
    "bio": {
      "birthday": "1917-05-29",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1961-01-20",
        "end": "1963-11-22",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H000953",
      "thomas": "01366",
      "govtrack": 405797,
      "icpsr": 4728
    },
    "name": {
      "first": "Hubert",
      "middle": "Horatio",
      "last": "Humphrey",
      "suffix": "Jr."
    },
    "bio": {
      "birthday": "1911-05-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1965-01-20",
        "end": "1969-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "J000160",
      "govtrack": 406058,
      "icpsr": 4979,
      "icpsr_prez": 99903
    },
    "name": {
      "first": "Lyndon",
      "middle": "Baines",
      "last": "Johnson"
    },
    "bio": {
      "birthday": "1908-08-27",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1961-01-20",
        "end": "1963-11-22",
        "party": "Democratic",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1963-11-22",
        "end": "1965-01-20",
        "party": "Democratic",
        "how": "succession"
      },
      {
        "type": "prez",
        "start": "1965-01-20",
        "end": "1969-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "A000059",
      "govtrack": 412593
    },
    "name": {
      "first": "Spiro",
      "middle": "Theodore",
      "last": "Agnew"
    },
    "bio": {
      "birthday": "1918-11-09",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1969-01-20",
        "end": "1973-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1973-01-20",
        "end": "1973-10-10",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "N000116",
      "govtrack": 408200,
      "icpsr": 6939,
      "icpsr_prez": 99904
    },
    "name": {
      "first": "Richard",
      "middle": "Milhous",
      "last": "Nixon"
    },
    "bio": {
      "birthday": "1913-01-09",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1953-01-20",
        "end": "1957-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1957-01-20",
        "end": "1961-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1969-01-20",
        "end": "1973-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1973-01-20",
        "end": "1974-08-09",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "F000260",
      "thomas": "00399",
      "govtrack": 404212,
      "icpsr": 3268,
      "icpsr_prez": 99905
    },
    "name": {
      "first": "Gerald",
      "middle": "Rudolph",
      "last": "Ford",
      "suffix": "Jr."
    },
    "bio": {
      "birthday": "1913-07-14",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1973-12-06",
        "end": "1974-08-09",
        "party": "Republican",
        "how": "appointment"
      },
      {
        "type": "prez",
        "start": "1974-08-09",
        "end": "1977-01-20",
        "party": "Republican",
        "how": "succession"
      }
    ]
  },
  {
    "id": {
      "bioguide": "R000363",
      "govtrack": 412594
    },
    "name": {
      "first": "Nelson",
      "middle": "Aldrich",
      "last": "Rockefeller"
    },
    "bio": {
      "birthday": "1908-07-08",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1974-12-19",
        "end": "1977-01-20",
        "party": "Republican",
        "how": "appointment"
      }
    ]
  },
  {
    "id": {
      "bioguide": "M000851",
      "thomas": "01402",
      "govtrack": 407824,
      "icpsr": 10813
    },
    "name": {
      "first": "Walter",
      "middle": "Frederick",
      "last": "Mondale"
    },
    "bio": {
      "birthday": "1928-01-05",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1977-01-20",
        "end": "1981-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412371,
      "icpsr_prez": 99906
    },
    "name": {
      "first": "James",
      "middle": "Earl",
      "last": "Carter",
      "nickname": "Jimmy"
    },
    "bio": {
      "birthday": "1924-10-01",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1977-01-20",
        "end": "1981-01-20",
        "party": "Democratic",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412372,
      "icpsr_prez": 99907
    },
    "name": {
      "first": "Ronald",
      "middle": "Wilson",
      "last": "Reagan"
    },
    "bio": {
      "birthday": "1911-02-06",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1981-01-20",
        "end": "1985-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1985-01-20",
        "end": "1989-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "Q000007",
      "thomas": "00935",
      "govtrack": 408970,
      "icpsr": 14447
    },
    "name": {
      "first": "James",
      "middle": "Danforth",
      "last": "Quayle",
      "nickname": "Dan"
    },
    "bio": {
      "birthday": "1947-02-04",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1989-01-20",
        "end": "1993-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B001166",
      "govtrack": 402108,
      "icpsr": 11008,
      "icpsr_prez": 99908
    },
    "name": {
      "first": "George",
      "middle": "Herbert Walker",
      "last": "Bush"
    },
    "bio": {
      "birthday": "1924-06-12",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1981-01-20",
        "end": "1985-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1985-01-20",
        "end": "1989-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1989-01-20",
        "end": "1993-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "G000321",
      "thomas": "00449",
      "lis": "S170",
      "govtrack": 404679,
      "icpsr": 14423
    },
    "name": {
      "first": "Albert",
      "middle": "Arnold",
      "last": "Gore",
      "suffix": "Jr.",
      "nickname": "Al"
    },
    "bio": {
      "birthday": "1948-03-31",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "1993-01-20",
        "end": "1997-01-20",
        "party": "Democrat",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "1997-01-20",
        "end": "2001-01-20",
        "party": "Democrat",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412374,
      "icpsr_prez": 99909
    },
    "name": {
      "first": "William",
      "middle": "Jefferson",
      "last": "Clinton",
      "nickname": "Bill"
    },
    "bio": {
      "birthday": "1946-08-19",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "1993-01-20",
        "end": "1997-01-20",
        "party": "Democrat",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "1997-01-20",
        "end": "2001-01-20",
        "party": "Democrat",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "C000344",
      "thomas": "00193",
      "govtrack": 402484,
      "icpsr": 14611
    },
    "name": {
      "first": "Richard",
      "middle": "Bruce",
      "last": "Cheney",
      "nickname": "Dick"
    },
    "bio": {
      "birthday": "1941-01-30",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "2001-01-20",
        "end": "2005-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "2005-01-20",
        "end": "2009-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412375
    },
    "name": {
      "first": "George",
      "middle": "Walker",
      "last": "Bush"
    },
    "bio": {
      "birthday": "1946-07-06",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "2001-01-20",
        "end": "2005-01-20",
        "party": "Republican",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "2005-01-20",
        "end": "2009-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "B000444",
      "thomas": "01284",
      "lis": "S010",
      "govtrack": 300008,
      "opensecrets": "N00001669",
      "votesmart": 53279,
      "icpsr": 14101,
      "fec": [
        "S8DE00012"
      ],
      "cspan": 34,
      "wikipedia": "Joe Biden",
      "wikidata": "Q6279",
      "google_entity_id": "kg:/m/012gx2",
      "ballotpedia": "Joe Biden"
    },
    "name": {
      "first": "Joseph",
      "middle": "Robinette",
      "last": "Biden",
      "suffix": "Jr.",
      "nickname": "Joe"
    },
    "bio": {
      "birthday": "1942-11-20",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "2009-01-20",
        "end": "2013-01-20",
        "party": "Democrat",
        "how": "election"
      },
      {
        "type": "viceprez",
        "start": "2013-01-20",
        "end": "2017-01-20",
        "party": "Democrat",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "2021-01-20",
        "end": "2025-01-20",
        "party": "Democrat",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "O000167",
      "thomas": "01763",
      "lis": "S298",
      "govtrack": 400629,
      "opensecrets": "N00009638",
      "votesmart": 9490
    },
    "name": {
      "first": "Barack",
      "middle": "Hussein",
      "last": "Obama"
    },
    "bio": {
      "birthday": "1961-08-04",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "2009-01-20",
        "end": "2013-01-20",
        "party": "Democrat",
        "how": "election"
      },
      {
        "type": "prez",
        "start": "2013-01-20",
        "end": "2017-01-20",
        "party": "Democrat",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "P000587",
      "thomas": "01649",
      "govtrack": 400315,
      "opensecrets": "N00003765",
      "votesmart": 34024,
      "fec": [
        "H8IN02060"
      ],
      "wikipedia": "Mike Pence",
      "house_history": 20013,
      "icpsr": 20117,
      "wikidata": "Q24313",
      "google_entity_id": "kg:/m/022r9r"
    },
    "name": {
      "first": "Mike",
      "last": "Pence"
    },
    "bio": {
      "birthday": "1959-06-07",
      "gender": "M"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "2017-01-20",
        "end": "2021-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "govtrack": 412733,
      "opensecrets": "N00023864",
      "votesmart": 15723,
      "fec": [
        "P80001571"
      ],
      "wikipedia": "Donald Trump"
    },
    "name": {
      "first": "Donald",
      "middle": "J.",
      "last": "Trump"
    },
    "bio": {
      "birthday": "1946-06-14",
      "gender": "M"
    },
    "terms": [
      {
        "type": "prez",
        "start": "2017-01-20",
        "end": "2021-01-20",
        "party": "Republican",
        "how": "election"
      }
    ]
  },
  {
    "id": {
      "bioguide": "H001075",
      "fec": [
        "S6CA00584"
      ],
      "govtrack": 412678,
      "votesmart": 120012,
      "wikipedia": "Kamala Harris",
      "ballotpedia": "Kamala Harris",
      "lis": "S387",
      "wikidata": "Q10853588",
      "google_entity_id": "kg:/m/08sry2",
      "opensecrets": "N00036915",
      "maplight": 2190,
      "cspan": 1018696,
      "icpsr": 41701
    },
    "name": {
      "first": "Kamala",
      "middle": "D.",
      "last": "Harris",
      "official_full": "Kamala D. Harris"
    },
    "bio": {
      "gender": "F",
      "birthday": "1964-10-20"
    },
    "terms": [
      {
        "type": "viceprez",
        "start": "2021-01-20",
        "end": "2025-01-20",
        "party": "Democrat",
        "how": "election"
      }
    ]
  }
]
  `;

  /* filter for the Presidents */
  const prez = raw_data.filter(row => row.terms.some(term => term.type === 'prez'));

  /* flatten objects */
  // const rows = prez.map(row => ({
  //   name: row.name.first + ' ' + row.name.last,
  //   birthday: row.bio.birthday,
  // }));

  const rows = [
    { name__: 'Сергей Новожилов', birthday: '1963-01-07' },
    { name__: 'George Washington', birthday: '1732-02-22' },
    { name__: 'John Adams', birthday: '1735-10-19' },
  ];

  console.log({ rows })

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [['ФИО', 'Дата рождения']], { origin: 'A1' });

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.name__.length), 10);
  worksheet['!cols'] = [{ wch: max_width }];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, 'Presidents.xlsx', { compression: true });
})();
