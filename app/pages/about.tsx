import { Container, Typography, Box, Button } from "@material-ui/core"
import Link from "next/link"

export default function Index(){
  return (
    <Container maxWidth="sm">
      <Box my={4}>
      <Typography variant="h3" component="h1" gutterBottom>
       <div><p>Hello World!</p></div>
      </Typography>
      <Link href="/">
         <Button variant="contained" color="primary">
           Got to index page
         </Button>
      </Link>
      </Box>
    </Container>
  )
}
