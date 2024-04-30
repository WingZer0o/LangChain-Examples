import { OllamaEmbeddings } from "npm:@langchain/community/embeddings/ollama";
import { NeonPostgres } from "npm:@langchain/community/vectorstores/neon";

const embeddings = new OllamaEmbeddings({
    model: "tinyllama",
    maxConcurrency: 5,
  });

// Initialize a NeonPostgres instance to store embedding vectors
const vectorStore = await NeonPostgres.initialize(embeddings, {
  connectionString: Deno.env.get("POSTGRES_URL") || ""
});

// You can add documents to the store, strings in the `pageContent` field will be embedded
// and stored in the database
// const documents = [
//   { pageContent: "Hello world", metadata: { topic: "greeting" } },
//   { pageContent: "Bye bye", metadata: { topic: "greeting" } },
//   {
//     pageContent: "Mitochondria is the powerhouse of the cell",
//     metadata: { topic: "science" },
//   },
// ];
// const idsInserted = await vectorStore.addDocuments(documents);

const resultsFour = await vectorStore.similaritySearch(
    "hello",
    1
  );
  console.log(resultsFour);