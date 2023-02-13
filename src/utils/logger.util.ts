import dayjs from 'dayjs';
import logger from 'pino';

export const log = logger({
  transport: {
    target: "pino-pretty",
  },
  base: { pid: false },
  timestamp: () => `, "time": "${dayjs().format()}"`,
});

// export const log =  logger({
//     transport: {
//         target: "pino-pretty",
//         options: {
//             translateTime:"SYS:dd-mm:yyyy HH:MM:ss" , 
//             ignore: "pid,hostname"
//         }
//     }
// })

//export default log;