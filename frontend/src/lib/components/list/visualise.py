import re
import os
import json

def analyze_svelte_component(file_path, scanned_files=None):
    """
    Analyze a Svelte 5 component for:
    1. Top-level props.
    2. Child components.
    3. Relationships between props and child component props (e.g., bind: or parent-to-child).

    Args:
        file_path (str): Path to the Svelte component file.
        scanned_files (set): Set of already scanned files to avoid recursion.
    """
    if scanned_files is None:
        scanned_files = set()
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        return {}

    scanned_files.add(file_path)

    with open(file_path, 'r') as file:
        content = file.read()

    print("Analyzing Svelte component...\n")

    # Step 1: Extract top-level props
    props_pattern = r'let\s*{([^}]*)}\s*=\s*\$props\(\)'
    props_match = re.search(props_pattern, content)
    if props_match:
        props = [prop.strip().split('=')[0] for prop in props_match.group(1).split(',')]
    else:
        props = []

    print(f"Top-Level Props Found: {props}")

    # Step 2: Identify child components
    child_components = re.findall(r'<([A-Z][A-Za-z0-9]*)[^>]*>', content)
    child_components = set(child_components)  # Remove duplicates
    print(f"Child Components Found: {child_components}")

    # Step 3: Analyze relationships
    relationships = []
    component_pattern = r'<([A-Z][A-Za-z0-9]*)\s*([^>/]*)(/?>)'
    for match in re.finditer(component_pattern, content):
        component_name, attributes, _ = match.groups()
        if component_name in child_components:
            print(f"Attributes for {component_name}: {attributes}")

            # Handle bind: syntax
            bind_matches = re.finditer(r'bind:(\w+)(?:=\{([^}]+)\})?', attributes)
            for bind_match in bind_matches:
                prop = bind_match.group(1)
                variable = bind_match.group(2) if bind_match.group(2) else prop
                relationships.append({
                    'component': component_name,
                    'prop': prop,
                    'variable': variable,
                    'type': 'bind'
                })

            # Handle regular props (exclude bind: prefixed attributes)
            prop_matches = re.finditer(r'(?<!bind:)(\w+)=\{([^}]+)\}', attributes)
            for prop_match in prop_matches:
                prop = prop_match.group(1)
                variable = prop_match.group(2)
                relationships.append({
                    'component': component_name,
                    'prop': prop,
                    'variable': variable,
                    'type': 'prop'
                })

    print(f"Relationships Found: {relationships}")

    # Convert sets to lists
    if isinstance(props, set):
        props = list(props)
    child_components = [
        list(item) if isinstance(item, set) else item 
        for item in child_components
    ]
    # If 'relationships' is a set, convert it
    if isinstance(relationships, set):
        relationships = list(relationships)

    # Prepare the data structure
    data = {
        "File Name": os.path.basename(file_path),
        "Top-Level Props": props,
        "Child Components": [],
        "Relationships Found": relationships
    }

    # Recursively scan children for nested data
    for child in child_components:
        child_path = os.path.join(os.path.dirname(file_path), f"{child}.svelte")
        if os.path.exists(child_path) and child_path not in scanned_files:
            child_data = analyze_svelte_component(child_path, scanned_files)
            # Child info is appended as a dict
            data["Child Components"].append(child_data)
        else:
            # Provide a placeholder structure with file name
            data["Child Components"].append({
                "File Name": f"{child}.svelte (not found)",
                "Top-Level Props": [],
                "Child Components": [],
                "Relationships Found": []
            })

    return data

# After defining the function, call it once and write a single JSON file:
if __name__ == "__main__": 
    result = analyze_svelte_component("./ListPanel.svelte")
    output_file = "./output.json"
    with open(output_file, "w") as f:
        json.dump(result, f, indent=4)
