import { IStatTime } from "../../stor/stor";
import { EStat } from "../Utils/enums";

function createDate(period: number): string {
  const date = (new Date(Date.now() - 86400000 * period)).toString().split(' ');
  return `${date[0]} ${date[1]} ${date[2]} ${date[3]}`;
}

export const demoTime: IStatTime[]= [
  {time: `${createDate(15)} 12:00:00`, status: EStat.start },
  {time: `${createDate(15)} 12:10:00`, status: EStat.final },
  {time: `${createDate(14)} 15:20:00`, status: EStat.start },
  {time: `${createDate(14)} 15:40:00`, status: EStat.pauseSrart },
  {time: `${createDate(14)} 15:50:00`, status: EStat.pauseStop },
  {time: `${createDate(14)} 15:55:00`, status: EStat.final },
  {time: `${createDate(13)} 23:00:00`, status: EStat.start },
  {time: `${createDate(13)} 23:10:00`, status: EStat.pauseSrart },
  {time: `${createDate(13)} 23:25:00`, status: EStat.pauseStop },
  {time: `${createDate(13)} 23:50:00`, status: EStat.final },
  {time: `${createDate(12)} 20:00:00`, status: EStat.start},
  {time: `${createDate(12)} 20:20:00`, status: EStat.stop},

  {time: `${createDate(11)} 10:30:00`, status: EStat.start},
  {time: `${createDate(11)} 10:55:00`, status: EStat.final},
  {time: `${createDate(10)} 10:30:00`, status: EStat.start},
  {time: `${createDate(10)} 10:40:00`, status: EStat.pauseSrart},
  {time: `${createDate(10)} 10:55:00`, status: EStat.pauseStop},
  {time: `${createDate(10)} 11:10:00`, status: EStat.final},
  {time: `${createDate(10)} 15:20:00`, status: EStat.start},
  {time: `${createDate(10)} 15:40:00`, status: EStat.final},
  {time: `${createDate(9)} 18:10:00`, status: EStat.start},
  {time: `${createDate(9)} 18:35:00`, status: EStat.stop},
  {time: `${createDate(8)} 22:00:00`, status: EStat.start},
  {time: `${createDate(8)} 22:25:00`, status: EStat.final},

  {time: `${createDate(7)} 11:00:00`, status: EStat.start },
  {time: `${createDate(7)} 11:25:00`, status: EStat.final},
  {time: `${createDate(6)} 09:20:00`, status: EStat.start },
  {time: `${createDate(6)} 09:40:00`, status: EStat.final},
  {time: `${createDate(5)} 09:45:00`, status: EStat.start },
  {time: `${createDate(5)} 10:10:00`, status: EStat.stop},
  {time: `${createDate(4)} 12:00:00`, status: EStat.start },
  {time: `${createDate(4)} 12:20:00`, status: EStat.final},
  {time: `${createDate(4)} 15:20:00`, status: EStat.start },
  {time: `${createDate(4)} 15:45:00`, status: EStat.stop},
  {time: `${createDate(3)} 18:10:00`, status: EStat.start },
  {time: `${createDate(3)} 18:20:00`, status: EStat.pauseSrart },
  {time: `${createDate(3)} 18:45:00`, status: EStat.pauseStop },
  {time: `${createDate(3)} 18:55:00`, status: EStat.final},
  {time: `${createDate(2)} 18:40:00`, status: EStat.start },
  {time: `${createDate(2)} 19:05:00`, status: EStat.final},
  {time: `${createDate(1)} 18:40:00`, status: EStat.start },
  {time: `${createDate(1)} 18:45:00`, status: EStat.pauseSrart },
  {time: `${createDate(1)} 19:20:00`, status: EStat.pauseStop },
  {time: `${createDate(1)} 19:35:00`, status: EStat.final},
  {time: `${createDate(1)} 20:00:00`, status: EStat.start },
  {time: `${createDate(1)} 20:20:00`, status: EStat.final},

  {time: `${createDate(0)} 10:00:00`, status: EStat.start },
  {time: `${createDate(0)} 10:25:00`, status: EStat.final},
  {time: `${createDate(0)} 11:00:00`, status: EStat.start },
  {time: `${createDate(0)} 11:25:00`, status: EStat.final},
  {time: `${createDate(0)} 12:00:00`, status: EStat.start },
  {time: `${createDate(0)} 12:10:00`, status: EStat.pauseSrart },
  {time: `${createDate(0)} 13:20:00`, status: EStat.pauseStop },
  {time: `${createDate(0)} 13:25:00`, status: EStat.stop},

];
