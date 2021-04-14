import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/forest_associations_development"
})

class EnchantedForest {
  constructor({ id, name }) {
    this.id = id
    this.name = name
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM enchanted_forests;")

      const enchantedForestData = result.rows
      const enchantedForests = enchantedForestData.map(enchantedForest => new this(enchantedForest))

      return enchantedForests
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM enchanted_forests WHERE id = $1;"
      const result = await pool.query(query, [id])

      const enchantedForestData = result.rows[0]
      const enchantedForest = new this(enchantedForestData)

      return enchantedForest
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async unicorns() {
    const unicornFile = await import("./Unicorn.js")
    const Unicorn = unicornFile.default

    try {
      const query = `SELECT * FROM unicorns WHERE enchanted_forest_id = $1;`
      const result = await pool.query(query, [this.id])

      const relatedUnicornsData = result.rows
      const relatedUnicorns = relatedUnicornsData.map((unicorn) => new Unicorn(unicorn))

      return relatedUnicorns
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }
}

export default EnchantedForest