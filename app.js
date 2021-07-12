import Express from 'express'
import Config from 'config'

const app = Express()
const PORT = Config.get('port') || 5000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}.....`))