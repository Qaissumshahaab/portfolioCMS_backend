/**
 * VISITOR TRACKING ROUTE
 * 
 * This route is triggered when a visitor accesses a portfolio website.
 * Frontend sends: GET request to /visit/:portfolioid
 * 
 * Purpose:
 * - Track unique visitors using visitor ID cookies
 * - Capture geolocation data (country) from IP address
 * - Aggregate analytics: total visitors, unique visitors, country stats, weekly/monthly views
 * - Update visitor records to track repeat visits
 * 
 * Data Flow:
 * 1. Frontend loads portfolio page
 * 2. Makes GET request with portfolioid in URL params
 * 3. Backend checks for existing visitorId in cookies
 * 4. If no visitorId exists, creates unique one and sets cookie (365-day expiry)
 * 5. Extracts IP address and performs geolocation lookup
 * 6. Records visit in visitor analytics database
 * 7. Updates aggregated statistics (daily, weekly, monthly)
 * 8. Returns success response
 */

import express from "express";
import { visitPortfolio } from "../controller/visitorsController";

const visitorRouter = express.Router();

// Route triggered when visitor accesses the portfolio
// No authentication needed - public route for tracking any visitor
visitorRouter.get("/visit/:portfolioid", visitPortfolio);

export default visitorRouter;
