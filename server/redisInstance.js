import redis from "redis";

export const DEFAULT_EXPIRATION_TIME = 600;

class Redis {
  constructor() {
    this.connected = false;
    this.client = null;
  }
  getConnection() {
    if (this.connected) {
      return this.client;
    }
    this.client = redis.createClient();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    // connect() is an async function, but we don't have to await it.
    this.client.connect();
    this.connected = true;
    return this.client;
  }
}

const instance = new Redis();

export default instance;
