import express from "express";
import { mockData } from "../../models/mockData.js";

const router = express.Router();

/* GET: // http://localhost:3000/api/contacts
 */
router.get("/", async (req, res, next) => {
  try {
    // LOGIC HERE
    res.json(mockData);
  } catch (error) {
    next(error);
  }
});

/* GET: // http://localhost:3000/api/contacts/1
 */
router.get("/:contactId", async (req, res, next) => {
  try {
    // LOGIC HERE
    const { contactId } = req.params;
    const contact = mockData.find(
      (contact) => contact.id === parseInt(contactId)
    );
    if (!contact) {
      const err = new Error("Contact not found");
      err.status = 404;
      return next(err);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

/* POST: // http://localhost:3000/api/contacts/ 
{
    "id": 3,
    "name": "Marvin Pacis",
    "email": "marvinpacis@example.com"
} 
*/
router.post("/", async (req, res, next) => {
  try {
    // LOGIC HERE
    const { name, email } = req.body;
    const newContact = { id: mockData.length + 1, name, email };
    mockData.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

/* DELETE: // http://localhost:3000/api/contacts/1
 */
router.delete("/:contactId", async (req, res, next) => {
  try {
    // LOGIC HERE
    const { contactId } = req.params;
    mockData.filter((contact) => contact.id !== parseInt(contactId));
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

/* PUT: // http://localhost:3000/api/contacts/1
{
    "name": "Joanna Shaw",
    "email": "shaw@example.com"
} 
*/
router.put("/:contactId", async (req, res, next) => {
  try {
    // LOGIC HERE
    const { contactId } = req.params;
    const { name, email } = req.body;
    const index = mockData.findIndex(
      (contact) => contact.id === parseInt(contactId)
    );
    if (index === -1) {
      const err = new Error("Contact not found");
      err.status = 404;
      return next(err);
    }
    mockData[index] = { ...mockData[index], name, email };
    res.json(mockData[index]);
  } catch (error) {
    next(error);
  }
});

export { router };
