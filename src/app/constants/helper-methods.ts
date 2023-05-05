import { DATETIME_TYPE } from "./enums";

export const getISOString = (date) => {
    try {
        if (date) {
            return new Date(date).toISOString();
        } else {
            return date;
        }
    } catch (error) {
        return date;
    }
}

export function toLowerCase(value: string) {
    if (value) {
        try {
            return value.toLowerCase();
        } catch (error) {
            return value;
        }
    } else {
        return value;
    }
}

export function getUnReferenced(body: any) {
    return JSON.parse(JSON.stringify(body));
}
export function updateTimeSlot(array: any = [], type) {
    array.map(sub_array => {
        sub_array.timeSlots.map(item => {
          if (type == DATETIME_TYPE.DATE_TO_TIME) {
            item.startTime =  timeConverter(item.startTime);
            item.endTime = timeConverter(item.endTime);
          }
          if (type == DATETIME_TYPE.TIME_TO_DATE) {
            item.startTime =  timeConverterWithDate(item.startTime);
            item.endTime = timeConverterWithDate(item.endTime);
          }
          
        })
    });
    return array;
}

export function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}


/**
 * @function cleanData
 * delete all empty keys
 */
 export function cleanData(value: object) {
    // Deep Copy object to so that actual does not changes
    const newValue = JSON.parse(JSON.stringify(value));
    // iterate newValue and remove empty fields
    (function isEmpty(data: any): boolean {
      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          const indexToRemove: number[] = [];
          data.forEach((item: any, index: number) => {
            if (isEmpty(item)) {
              indexToRemove.unshift(index);
            }
          });
          indexToRemove.forEach((item) => {
            data.splice(item, 1);
          });
        } else {
          Object.keys(data).forEach(key => {
            let trimValue = data[key];
            if (trimValue && typeof trimValue === "string") {
              trimValue = trimValue.trim();
            }
            if (isEmpty(trimValue)) {
              delete data[key];
            }
          });
          if (!Object.keys(data).length) {
            return true;
          }
        }
      }
      return data === null || data === undefined || data === '';
    })(newValue);
    return newValue;
  }


    /**
   *
   * @param date ISO date
   * {} return time
   */
  export function  timeConverter(date: any) {
      console.log(date);
      if (!date) { return date }
      let time = new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      return time
      /*------------*/
  }
  
    /**
     *
     * @param time string
     * {} return date with time ISO
     */
   export function  timeConverterWithDate(time: string, todayDate?: boolean) {
      if (!time || time.length > 15) { return time }
      if (!todayDate) {
        return new Date(`January 29, 2001 ${time}`)
      } else {
        const today = new Date();
        let date = new Date(`${today.getMonth() + 1} ${today.getDate()}, ${today.getFullYear()} ${time}`);
        return date
      }
    }
  
  