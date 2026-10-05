import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const [collection, oldField, newField] = process.argv.slice(2);

if (!collection || !oldField || !newField) {
    console.error("Usage: node rename-field.js <collection> <oldField> <newField>");
    process.exit(1);
}

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await mongoose.connection.collection(collection).updateMany(
        { [oldField]: { $exists: true } },
        [
            { $set: { [newField]: `$${oldField}` } },
            { $unset: oldField }
        ]
    );

    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

    await mongoose.disconnect();
    console.log("Disconnected");
};

run().catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
});
