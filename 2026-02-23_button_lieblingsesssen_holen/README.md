# Distribution Plan for Lieblingsessen App

## 1. Exact File Structure to Distribute

```
lieblingsessen-app/
├── README.md                    # User instructions
├── main.ts                      # Server code
├── db.ts                        # Database logic
├── lieblingsessen.db            # SQLite database
├── deno.json                    # Deno configuration
├── urls.rest                    # REST API testing
├── front-end/
│   ├── index.html               # Main HTML page
│   ├── script.js                # JavaScript logic
│   └── style.css               # Styling
└── start-app.bat                 # Windows launcher
```

## 2. Step-by-Step User Instructions

### Quick Start (3 Steps)

1. **Download the app**: Extract the zip file to a folder on your computer
2. **Double-click start-app.bat** (Windows) or follow terminal instructions (macOS/Linux)
3. **Open your browser** and go to http://localhost:8000

### Detailed Instructions

#### Windows Users
1. Right-click the zip file and select "Extract All..."
2. Choose a location (like Desktop or Documents)
3. Double-click `start-app.bat`
4. Wait for the message "Server running on http://localhost:8000"
5. Open your web browser and go to http://localhost:8000

#### macOS Users
1. Double-click the zip file to extract it
2. Open Terminal (Finder → Applications → Utilities → Terminal)
3. Type: `cd ` (with space) then drag the extracted folder into Terminal and press Enter
4. Type: `deno run -A main.ts`
5. Open your web browser and go to http://localhost:8000

#### Linux Users
1. Extract the zip file using your file manager
2. Open Terminal
3. Type: `cd ` (with space) then drag the extracted folder into Terminal and press Enter
4. Type: `deno run -A main.ts`
5. Open your web browser and go to http://localhost:8000

## 3. Prerequisites and Installation Guide

### Required Software

#### For All Platforms
- **Deno Runtime** (version 1.36 or later)

#### Windows
- Download from: https://deno.land/x/install/install.ps1
- Or use Chocolatey: `choco install deno`

#### macOS
- Using Homebrew: `brew install deno`
- Or download from deno.land

#### Linux
- Using Shell: `curl -fsSL https://deno.land/install.sh | sh`
- Or use package manager for your distribution

### Installation Steps

1. **Check if Deno is installed**
   - Windows/macOS/Linux: Open Terminal/Command Prompt and type `deno --version`
   - If you see version number, you're ready!
   - If not, install Deno using the instructions above

2. **Verify installation**
   ```bash
   deno --version
   deno run https://deno.land/std/examples/welcome.ts
   ```

## 4. How to Use the .rest File for Testing

### Using URLs.rest with VS Code

1. Install the **REST Client** extension in VS Code
2. Open the `urls.rest` file
3. Click "Send Request" above any of the requests:
   - `GET http://localhost:8000/lieblinge` - Get all favorite foods
   - `GET http://localhost:8000/index.html` - Get the main page
   - `GET http://localhost:8000/script.js` - Get the JavaScript file

### Manual Testing

1. Start the app using `start-app.bat` or `deno run -A main.ts`
2. Open a new Terminal/Command Prompt
3. Test the API:
   ```bash
   curl http://localhost:8000/lieblinge
   ```

## 5. Troubleshooting Common Issues

### "Deno command not found"
- **Solution**: Deno is not installed. Install it from deno.land
- **Windows**: Make sure you restart Command Prompt after installation
- **macOS/Linux**: Add Deno to your PATH if needed

### "Permission denied" errors
- **Solution**: The app needs permissions to access files and network
- Always use: `deno run -A main.ts` (the `-A` gives all permissions)

### "Server running on http://localhost:8000" but page won't load
- **Solution**: Make sure the app is still running
- Check if the terminal/command prompt is still open
- Try refreshing the browser page

### "404 Not Found" errors
- **Solution**: Make sure you're going to http://localhost:8000 (not localhost:3000 or other port)
- Check if the server started correctly

### "Database file not found"
- **Solution**: Make sure `lieblingsessen.db` is in the same folder as `main.ts`
- Don't move the database file to a different location

### App crashes on startup
- **Solution**: Make sure all files are present and not corrupted
- Try re-downloading the zip file
- Check that `lieblingsessen.db` is not empty or corrupted

### Browser shows blank page
- **Solution**: Check the browser's developer console (F12) for errors
- Make sure JavaScript is enabled in your browser
- Try clearing browser cache and reloading

## Additional Tips

### For Advanced Users
- To stop the server: Press `Ctrl+C` in the terminal
- To restart: Close the terminal and start again
- To view database: Use any SQLite browser tool

### Security Notes
- This app runs locally on your computer only
- No internet connection is needed after installation
- Your data stays on your computer

### File Locations
- **App files**: In the extracted folder
- **Database**: `lieblingsessen.db` (your data file)
- **Browser cache**: Cleared automatically when server restarts

---

**Support**: If you encounter issues not listed here, please ensure all files are properly extracted and Deno is correctly installed. The app should work out-of-the-box on Windows, macOS, and Linux systems.