import pg from 'pg'
const pool = new pg.Pool({
  connectionString:"postgres://postgres:password@localhost:5432/forest_associations_development"
})

class Seeder {
  static async seed() {
    try {
      const enchantedForests = [
        {
          name: "Hundred Acre Wood"
        },
        {
          name: "Puzzlewood"
        },
        {
          name: "Redwood"
        }
      ]

      for(let i=0; i < enchantedForests.length; i++) {
        const enchantedForest = enchantedForests[i]
        const queryString = "INSERT INTO enchanted_forests (name) VALUES ($1);"
        await pool.query(queryString, [enchantedForest.name])
      }

      const hundredAcreData = await pool.query("SELECT * FROM enchanted_forests WHERE name = 'Hundred Acre Wood';")
      const hundredAcre = hundredAcreData.rows[0]
      const puzzlewoodData = await pool.query("SELECT * FROM enchanted_forests WHERE name = 'Puzzlewood';")
      const puzzlewood = puzzlewoodData.rows[0]
      const redwoodData = await pool.query("SELECT * FROM enchanted_forests WHERE name = 'Redwood';")
      const redwood = redwoodData.rows[0]

      const unicorns = [
        { name: "Flora", enchantedForest: hundredAcre },
        { name: "Serenity", enchantedForest: hundredAcre },
        { name: "Sapphire", enchantedForest: puzzlewood },
        { name: "Rose", enchantedForest: redwood }
      ]

      for(let i=0; i < unicorns.length; i++) {
        const unicorn = unicorns[i]
        const queryString = `INSERT INTO unicorns (name, enchanted_forest_id) VALUES ($1, $2);`
        await pool.query(queryString, [unicorn.name, unicorn.enchantedForest.id])
      }
      console.log("Seeding complete")
      pool.end()
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }
}

export default Seeder