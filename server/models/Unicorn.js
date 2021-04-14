import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/forest_associations_development"
})

class Unicorn {
  constructor({ id, name, age, enchantedForestId, enchanted_forest_id }) {
    this.id = id
    this.name = name
    this.age = age
    this.enchantedForestId = enchantedForestId || enchanted_forest_id
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM unicorns;")

      //get the results
      const unicornsData = result.rows
      const unicorns = unicornsData.map(unicorn => new this(unicorn))

      return unicorns
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM unicorns WHERE ID = $1;"
      const result = await pool.query(query, [id])

      //get the results
      const unicornData = result.rows[0]
      const unicorn = new this(unicornData)

      return unicorn
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async enchantedForest() {
    const enchantedForestFile = await import("./EnchantedForest")
    const EnchantedForest = enchantedForestFile.default

    try {
      const query = `SELECT * FROM enchanted_forests WHERE id = $1;`
      const result = pool.query(query, [this.enchantedForestId])

      const relatedEnchantedForestData = (await result).rows[0]
      const relatedEnchantedForest = new EnchantedForest(relatedEnchantedForestData)

      return relatedEnchantedForest
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }
}

export default Unicorn