import { Problem } from "./types";

export const advancedProblems: Problem[] = [
    {
        id: "boat-movements",
        title: "Boat Movements",
        archetype: "Grid Traversal / Logic Verification",
        source: "TestDome",
        concept:
            "A boat moves on a grid (boolean[][] where true=water, false=land). The boat has specific movement capabilities: Move 1 tile horizontally (left/right), Move 1 tile vertically (up/down), or Move 2 tiles vertically (jump). The function canTravelTo(fromRow, fromCol, toRow, toCol) checks if a single step is valid. Instead of BFS, verify the move against the allowed rules: Bounds Check (is destination inside the array?), Terrain Check (is destination water/true?), and Movement Logic — Horizontal: row matches, |col1 - col2| == 1; Vertical (1 step): col matches, |row1 - row2| == 1; Vertical (2 steps): col matches, |row1 - row2| == 2, and the intermediate tile must also be water.",
        optimalApproach:
            "Validate bounds, check destination is water, then verify movement follows rules. For 2-step vertical jumps, crucially check the intermediate tile is also water — you cannot jump over land.",
        code: "",
        pitfalls: [
            {
                title: "Jump Over Land Error",
                description:
                    "Candidates often check the destination tile but forget to check the tile in between for the 2-step vertical move. The problem states the boat moves through water, implying the path must be clear.",
            },
        ],
    },
    {
        id: "folders-xml",
        title: "Folders (XML/Recursion)",
        archetype: "Recursion / XML Parsing",
        source: "TestDome",
        concept:
            "Parse an XML string representing a folder structure and return all folder names starting with a specific letter. Since the nesting depth is arbitrary, Recursion is the standard solution. Java's XML DOM parser (DocumentBuilder) is ideal here.",
        optimalApproach:
            "Use Java's DOM Parser (DocumentBuilder) to parse the XML. Recursively iterate through childNodes. If a node is an ELEMENT_NODE and the 'name' attribute starts with the target letter, add it to the result list.",
        code: `import org.w3c.dom.*;
import javax.xml.parsers.*;
import org.xml.sax.InputSource;
import java.io.StringReader;
import java.util.*;

public class Folders {
    public static Collection<String> folderNames(String xml, char startingLetter) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new InputSource(new StringReader(xml)));

        List<String> result = new ArrayList<>();
        findFolders(doc.getDocumentElement(), startingLetter, result);
        return result;
    }

    private static void findFolders(Node node, char letter, List<String> result) {
        // Check if current node is an Element (Folder)
        if (node.getNodeType() == Node.ELEMENT_NODE) {
            String name = ((Element) node).getAttribute("name");
            if (name != null && !name.isEmpty() && name.charAt(0) == letter) {
                result.add(name);
            }
        }

        // Recursively search children
        NodeList children = node.getChildNodes();
        for (int i = 0; i < children.getLength(); i++) {
            findFolders(children.item(i), letter, result);
        }
    }
}`,
        pitfalls: [
            {
                title: "Regex Parsing",
                description:
                    "Attempting to use Regular Expressions to parse XML. Regex is not suitable for parsing recursive/nested structures (HTML/XML) and often fails on edge cases or commented-out sections.",
            },
            {
                title: "Parsing Whitespace",
                description:
                    "The DOM parser interprets newlines between tags as #text nodes. A robust solution must explicitly check node.getNodeType() == Node.ELEMENT_NODE to avoid casting exceptions.",
            },
        ],
    },
    {
        id: "alert-service",
        title: "Alert Service (Architecture)",
        archetype: "Refactoring / Dependency Injection (IoC)",
        source: "TestDome",
        concept:
            "A class AlertService is tightly coupled to a MapAlertDAO. The task is to refactor it to use an interface AlertDAO, allowing for dependency injection. This is a test of architectural principles — the Dependency Inversion Principle (DIP). Steps: 1) Create Interface: Extract AlertDAO interface with methods addAlert and getAlert. 2) Implement: Ensure MapAlertDAO implements AlertDAO. 3) Inject: Modify AlertService to accept AlertDAO in its constructor. 4) Delegate: Replace the internal new MapAlertDAO() with the injected instance.",
        optimalApproach:
            "Extract an AlertDAO interface. Refactor AlertService to accept AlertDAO in its constructor (Constructor Injection) rather than instantiating a concrete MapAlertDAO internally. This decouples the service from its data access implementation.",
        code: "",
        pitfalls: [
            {
                title: "Visibility Modifiers",
                description:
                    "The prompt often specifies 'package-private' for the interface. Candidates habitually make it public, violating the requirements.",
            },
            {
                title: "Partial Refactoring",
                description:
                    "Adding the constructor but forgetting to remove the hardcoded instantiation inside the field declaration (private final AlertDAO storage = new MapAlertDAO(); needs to become just private final AlertDAO storage;).",
            },
        ],
    },
    {
        id: "mega-store",
        title: "Mega Store (Enums/Strategy)",
        archetype: "Business Logic / Enums / Strategy Pattern",
        source: "TestDome",
        concept:
            "Implement a discount calculator based on a DiscountType Enum (Standard, Seasonal, Weight). The logic for 'Weight' discount is complex (e.g., depends on cart weight). Use a switch statement or the Strategy Pattern on the Enum. Standard: Fixed %. Seasonal: Fixed %. Weight: If weight <= 10, Discount X; else Discount Y.",
        optimalApproach:
            "Use a switch statement or the Strategy Pattern on the DiscountType Enum. Handle each discount type's specific logic, paying careful attention to the Weight threshold conditions and whether discount applies to unit or total price.",
        code: "",
        pitfalls: [
            {
                title: "Hardcoding Values",
                description:
                    "Using magic numbers (e.g., 0.06) without comments or constants.",
            },
            {
                title: "Logic Errors",
                description:
                    "Misinterpreting the 'Weight' threshold (e.g., applying the discount to the unit price instead of total price, or getting the < vs <= condition wrong on the weight limit).",
            },
        ],
    },
];
