## For simplicity .env is sent through the mail.

## Instead of generating a jwt, a sample has been provided.

## Port has been hardcoded

## An automated api test report has been provided for better understanding.

## Introspection is allowed by default.

## As instructed: Can query Node, actions, responses, and some other relational data.

## Schema Design as instructed.

## Followed Separation of concerns and Graphql first validation.

## Proper Project Hygiene is maintained.


## How to Run This Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy .env and set it in the project root.
     ```
     JWT_SAMPLE='Sample Token'
     ```

4. **Start the server:**
   ```bash
   npm start 
   or
   npm run dev
   ```
   The server will run on http://localhost:4000

5. **Testing the API:**
   - Use the provided JWT token in your requests.
   - Example `curl` command:
     ```bash
     curl -X POST http://localhost:4000/ \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer [JWT_TOKEN]" \
       -d '{"query": "{ actions { _id name } }"}'
     ```

##Sample request: curl -sS -X POST http://localhost:4000/ \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE3NTYxOTIwMDAsImV4cCI6MTc1NjI3ODQwMH0.I4MwsqpVUQRQUy1zlf8b4sjz3BYAyDHGlw_tOLAN0Eg' \
  -d '{"query":"query { responses { _id createdAt } resourceTemplates { _id schema } }"}'     

**Note:**  
- Ensure Node.js (v14 or higher) and npm are installed.
- For more details, see the API_Test_Report.md file.
