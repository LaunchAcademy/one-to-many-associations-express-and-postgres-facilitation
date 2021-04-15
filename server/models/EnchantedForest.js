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

  isValid() {
    this.errors = {}
    const requiredFields = ["name"]
    let isValid = true
    
    for(const requiredField of requiredFields) {
      this.errors[requiredField] = []
      if (!this[requiredField]) {
        isValid = false
        this.errors[requiredField].push("can't be blank")
      }
    }
    return isValid
  }

  async save() {
    try {
      if (this.isValid()) {
        delete this.errors
        
        const queryString = "INSERT INTO enchanted_forests (name) VALUES ($1) RETURNING id;"
        const result = await pool.query(queryString, [this.name])
  
        const newEnchantedForestId = result.rows[0].id
        this.id = newEnchantedForestId
  
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async unicorns() {
    // import within method to avoid circular dependency
    // import as Promise-based method with await
    const unicornFile = await import("./Unicorn.js")
    // console.log(unicornFile)
    // [Module] { default: [class Unicorn] }
    
    const Unicorn = unicornFile.default
    // console.log(Unicorn)
    // [class Unicorn]

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