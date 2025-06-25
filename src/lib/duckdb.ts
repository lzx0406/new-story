import DuckDB from '@duckdb/duckdb-wasm';
import * as d3 from 'd3-dsv';

let conn: any;

export async function getConn() {
  if (conn) return conn;

  /* Pick the best bundle from CDN */
  const JS = await DuckDB.selectBundle(DuckDB.getJsDelivrBundles());

  /* Instantiate the WASM engine */
  const db = new DuckDB.AsyncDuckDB(JS.mainWorker);
  await db.instantiate(JS.mainModule);

  conn = await db.connect();

  const csvText = await fetch('/src/lib/data/posts.csv').then(r => r.text());
  await conn.insertCSV(csvText, { name: 'post', header: true });

  return conn;
}


