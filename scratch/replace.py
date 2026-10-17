import os

directory = r"c:\Users\HP\Desktop\my-work\day-2\topcoolac"
old_str = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
new_str = "/assets/css/all.min.css"

count = 0
for root, dirs, files in os.walk(directory):
    if "node_modules" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if old_str in content:
                content = content.replace(old_str, new_str)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
                count += 1

print(f"Total files updated: {count}")
