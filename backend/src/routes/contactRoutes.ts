
import { Router, Request, Response } from "express";
import Contact from "../models/Contact.js";

const router = Router();

router.post(
    "/",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, subject, message } = req.body ?? {};

            // Check that all fields are provided as non-empty strings
            if (
                typeof name !== "string" ||
                typeof email !== "string" ||
                typeof subject !== "string" ||
                typeof message !== "string" ||
                !name.trim() ||
                !email.trim() ||
                !subject.trim() ||
                !message.trim()
            ) {
                res.status(400).json({
                    success: false,
                    message: "Name, email, subject, and message are required.",
                });
                return;
            }

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.trim())) {
                res.status(400).json({
                    success: false,
                    message: "Please enter a valid email address.",
                });
                return;
            }

            // Save the contact form submission to MongoDB
            const contact = await Contact.create({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject.trim(),
                message: message.trim(),
            });

            res.status(201).json({
                success: true,
                message: "Contact message submitted successfully.",
                data: {
                    id: contact._id,
                    name: contact.name,
                    email: contact.email,
                    subject: contact.subject,
                    message: contact.message,
                    createdAt: contact.createdAt,
                },
            });
        } catch (error) {
            console.error("Contact submission error:", error);

            res.status(500).json({
                success: false,
                message: "Unable to submit contact message.",
            });
        }
    }
);

export default router;
