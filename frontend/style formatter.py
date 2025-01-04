from pathlib import Path
import re
import shutil

def format_style_attributes(content):
    # Pattern to match style attributes that span multiple lines
    pattern = r'style="[^"]*?\n[^"]*?"'
    
    def replace_style(match):
        # Remove newlines and extra spaces from style content
        style = match.group(0)
        return ' '.join(style.split())
    
    # Replace all matching patterns
    return re.sub(pattern, replace_style, content, flags=re.DOTALL)

def process_svelte_files(directory):
    # Find all .svelte files
    svelte_files = Path(directory).rglob('*.svelte')
    
    for file_path in svelte_files:
        try:
            # Read and process file
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Format the content
            formatted_content = format_style_attributes(content)
            
            # Write back if changes were made
            if formatted_content != content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(formatted_content)
                print(f"Processed: {file_path}")
            
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")

if __name__ == "__main__":
    directory = input("Enter directory path containing Svelte files: ")
    process_svelte_files(directory)