"""
Simple script to create placeholder icons for the Chrome Extension.
Run this script with: python create_icons.py
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Create a simple icon with gradient background and text."""
    # Create image with gradient-like solid color
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw a circle
    margin = size // 6
    draw.ellipse([margin, margin, size - margin, size - margin], 
                 fill='#764ba2', outline='white', width=max(2, size//32))
    
    # Add text "JF" for JobFinder
    try:
        # Try to use a system font
        font_size = size // 2
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Draw text
    text = "JF"
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((size - text_width) // 2, (size - text_height) // 2 - size // 10)
    draw.text(position, text, fill='white', font=font)
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

def main():
    """Generate all required icon sizes."""
    print("🎨 Creating placeholder icons for JobFinder AI...")
    print()
    
    # Check if Pillow is installed
    try:
        from PIL import Image
    except ImportError:
        print("❌ Error: Pillow library not found!")
        print("Please install it with: pip install pillow")
        return
    
    # Get the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create icons in different sizes
    sizes = [(16, 'icon16.png'), (48, 'icon48.png'), (128, 'icon128.png')]
    
    for size, filename in sizes:
        filepath = os.path.join(script_dir, filename)
        create_icon(size, filepath)
    
    print()
    print("✅ All icons created successfully!")
    print("📁 Icons saved in:", script_dir)
    print()
    print("Next steps:")
    print("1. Go to chrome://extensions/")
    print("2. Enable Developer Mode")
    print("3. Click 'Load unpacked' and select the JustApply folder")

if __name__ == "__main__":
    main()
