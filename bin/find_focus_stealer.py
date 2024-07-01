#!/usr/bin/python3

import time
from datetime import datetime
from AppKit import NSWorkspace

last_active_name = None
while True:
    active_app = NSWorkspace.sharedWorkspace().activeApplication()
    if active_app['NSApplicationName'] != last_active_name:
        last_active_name = active_app['NSApplicationName']
        print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: {active_app['NSApplicationName']} [{active_app['NSApplicationPath']}]")
    time.sleep(1)

