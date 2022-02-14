import { generateApp } from "./app";

const PORT = Number(process.env.PORT) || 3001;

(async () => {
  (await generateApp()).listen(PORT, () => {
    console.log(`listening on ${PORT} port`);
  });
})();
