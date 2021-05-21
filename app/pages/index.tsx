import { Container, Typography, Box, Button } from "@material-ui/core"
import Link from "next/link"

export default function Index(){
  return (
    <Container maxWidth="sm">
      <Box my={4}>
      <Typography variant="h3" component="h1" gutterBottom>
       <div><p>Hello World!</p></div>
      </Typography>
      <Link href="/about">
         <Button variant="contained" color="primary">
           Got to about page
         </Button>
      </Link>
      </Box>

      <Box my={4}>
      <Link href="/list">
         <Button variant="contained" color="primary">
           to list Page
         </Button>
      </Link>
      </Box>
    </Container>
  )
}
