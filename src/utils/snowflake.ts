/**
 * mini 雪花算法，用于简单的系统id生成
 */
export class Snowflake {
  static #twepoch = 1658110470937n

  static #workerIdBits: bigint = 5n
  static #dataCenterIdBits: bigint = 5n
  static #sequenceBits: bigint = 12n

  static #maxWorkerId: bigint = -1n ^ (-1n << Snowflake.#workerIdBits)
  static #maxDataCenterId: bigint =
    -1n ^ (-1n << Snowflake.#dataCenterIdBits)
  static #sequenceMask: bigint = -1n ^ (-1n << Snowflake.#sequenceBits)

  static #workerIdShift: bigint = Snowflake.#sequenceBits
  static #dataCenterIdShift: bigint =
    Snowflake.#sequenceBits + Snowflake.#workerIdBits
  static #timestampLeftShift: bigint =
    Snowflake.#dataCenterIdShift + Snowflake.#dataCenterIdBits

  static #sequence: bigint = 0n
  static #lastTimestamp: bigint = -1n
  static #workerId: bigint
  static #dataCenterId: bigint

  constructor(workerId: bigint, dataCenterId: bigint) {
    if (workerId > Snowflake.#maxWorkerId || workerId < 0n)
      throw new Error(
        `workerId can't be greater than ${Snowflake.#maxWorkerId} or less than 0`
      )
    if (dataCenterId > Snowflake.#maxDataCenterId || dataCenterId < 0n)
      throw new Error(
        `dataCenterId can't be greater than ${Snowflake.#maxDataCenterId} or less than 0`
      )
    Snowflake.#workerId = workerId
    Snowflake.#dataCenterId = dataCenterId
    return this
  }
  public nextId(): bigint {
    let timestamp = Snowflake.#currentLinuxTime()
    const diff = timestamp - Snowflake.#lastTimestamp
    if (diff < 0n)
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${-diff} milliseconds`
      )
    if (diff === 0n) {
      Snowflake.#sequence = (Snowflake.#sequence + 1n) & Snowflake.#sequenceMask
      if (Snowflake.#sequence === 0n) {
        timestamp = Snowflake.#tilNextMillis(Snowflake.#lastTimestamp)
      }
    } else Snowflake.#sequence = 0n
    Snowflake.#lastTimestamp = timestamp
    return (
      ((timestamp - Snowflake.#twepoch) << Snowflake.#timestampLeftShift) |
      (Snowflake.#dataCenterId << Snowflake.#dataCenterIdShift) |
      (Snowflake.#workerId << Snowflake.#workerIdShift) |
      Snowflake.#sequence
    )
  }
  static #tilNextMillis(lastTimeStamp: bigint) {
    let timestamp: bigint = Snowflake.#currentLinuxTime()
    while (timestamp <= lastTimeStamp) timestamp = Snowflake.#currentLinuxTime()
    return timestamp
  }
  static #currentLinuxTime(): bigint {
    return BigInt(new Date().valueOf())
  }
}