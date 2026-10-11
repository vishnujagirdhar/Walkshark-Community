import os
import subprocess
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"D:\F-Z\New Project\WALKSHARK\Finn community Web\screenshots"
BASE_URL = "http://localhost:3000"

os.makedirs(OUTPUT_DIR, exist_ok=True)

pages = [
    # Desktop 1440px
    ("desktop_landing_1440.png", f"{BASE_URL}/", 1440, 900),
    ("desktop_dashboard_1440.png", f"{BASE_URL}/dashboard", 1440, 900),
    ("desktop_submit_1440.png", f"{BASE_URL}/dashboard/submit", 1440, 900),
    ("desktop_milestones_1440.png", f"{BASE_URL}/dashboard/milestones", 1440, 900),
    ("desktop_redeem_1440.png", f"{BASE_URL}/dashboard/redeem", 1440, 900),
    ("desktop_admin_1440.png", f"{BASE_URL}/admin", 1440, 900),
    ("desktop_signup_1440.png", f"{BASE_URL}/auth/signup", 1440, 900),
    ("desktop_signin_1440.png", f"{BASE_URL}/auth/signin", 1440, 900),
    ("desktop_rules_1440.png", f"{BASE_URL}/rules", 1440, 900),

    # Tablet 768px
    ("tablet_landing_768.png", f"{BASE_URL}/", 768, 1024),
    ("tablet_dashboard_768.png", f"{BASE_URL}/dashboard", 768, 1024),
    ("tablet_submit_768.png", f"{BASE_URL}/dashboard/submit", 768, 1024),
    ("tablet_admin_768.png", f"{BASE_URL}/admin", 768, 1024),

    # Mobile 390px
    ("mobile_landing_390.png", f"{BASE_URL}/", 390, 844),
    ("mobile_dashboard_390.png", f"{BASE_URL}/dashboard", 390, 844),
    ("mobile_submit_390.png", f"{BASE_URL}/dashboard/submit", 390, 844),
    ("mobile_milestones_390.png", f"{BASE_URL}/dashboard/milestones", 390, 844),
    ("mobile_redeem_390.png", f"{BASE_URL}/dashboard/redeem", 390, 844),
    ("mobile_signup_390.png", f"{BASE_URL}/auth/signup", 390, 844),
    ("mobile_signin_390.png", f"{BASE_URL}/auth/signin", 390, 844),
    ("mobile_admin_390.png", f"{BASE_URL}/admin", 390, 844),
]

for filename, url, width, height in pages:
    target_path = os.path.join(OUTPUT_DIR, filename)
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        f"--screenshot={target_path}",
        f"--window-size={width},{height}",
        "--hide-scrollbars",
        url
    ]
    print(f"Capturing {filename} ({width}x{height}) from {url}...")
    subprocess.run(cmd, check=False)

print("All screenshots successfully captured!")
