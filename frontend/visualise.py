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
        raw_props = props_match.group(1).split(',')
        props = []
        for prop in raw_props:
            prop = prop.strip()
            if '=' in prop:
                prop = prop.split('=')[0].strip()
            if ':' in prop:
                prop = prop.split(':')[1].strip()
            if prop:  # Only add non-empty props
                props.append(prop)
    else:
        props = []

    print(f"Top-Level Props Found: {props}")

    # Step 2: Identify child components and their import paths
    import_pattern = r'import\s+([A-Za-z0-9_]+)\s+from\s+[\'"]([^\'"]+)[\'"]'
    imports = re.findall(import_pattern, content)
    import_dict = {name: path for name, path in imports}

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

    additional_globals = parse_global_vars(file_path)
    for gv in additional_globals:
        if gv not in props:
            props.append(gv)

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
        if child in import_dict:
            print()
            if (import_dict[child].startswith("$lib")):
                child_path = os.path.abspath(source_dir + import_dict[child][1:])
            else:
                child_path = os.path.abspath(os.path.join(os.path.dirname(file_path), import_dict[child]))

            if not child_path.endswith('.svelte'):
                child_path += '.svelte'
        else:
            child_path = os.path.join(os.path.dirname(file_path), f"{child}.svelte")

        if os.path.exists(child_path) and child_path:
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

def parse_global_vars(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    script_pattern = r'<script[^>]*>(.*?)</script>'
    scripts = re.findall(script_pattern, content, re.DOTALL)
    global_vars = set()

    for script in scripts:
        # Let/const declarations
        let_vars = re.findall(r'(?m)^\s*let\s+(\w+)\s*[=;]', script)
        const_vars = re.findall(r'(?m)^\s*const\s+(\w+)\s*[=;]', script)
        
        # Function definitions
        functions = re.findall(r'(?m)^\s*(?:async\s+)?function\s+(\w+)', script)
        arrow_funcs = re.findall(r'(?m)^\s*const\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>', script)
        
        # Imports
        imports = re.findall(r'import\s*{\s*([^}]+)\s*}', script)
        imported_vars = [var.strip() for import_str in imports for var in import_str.split(',')]
        
        # Reactive declarations
        reactive_vars = re.findall(r'\$:\s*(\w+)\s*=', script)
        
        # Exclude exports
        exports = re.findall(r'export\s+(?:let|const|function)\s+(\w+)', script)

        # Combine all found variables
        all_vars = set(let_vars + const_vars + functions + arrow_funcs + imported_vars + reactive_vars)
        global_vars.update(var for var in all_vars if var not in exports)

    return list(global_vars)

# After defining the function, call it once and write a single JSON file:
if __name__ == "__main__": 
    source_dir = "./src/"
    result = analyze_svelte_component("./src/routes/+layout.svelte")
    #result = analyze_svelte_component("./src/lib/components/list/ListPanel.svelte")
    output_file = "./output.json"
    with open(output_file, "w") as f:
        json.dump(result, f, indent=4)
