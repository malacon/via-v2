#!/bin/bash

# Iterate over all PNG and JPG files in the current directory
for file in *.png *.jpg *.jpeg; do
    # Check if the file exists
    if [ -f "$file" ]; then
        # Get the file size in bytes
        filesize=$(stat -c%s "$file")
        # Check if the file size is greater than 2MB (2097152 bytes)
        if [ $filesize -gt 2097152 ]; then
            # Compress the file using ImageMagick
            mogrify -resize 80% -quality 85 "$file"
            # Repeat the size check and compression until the file is under 2MB
            while [ $(stat -c%s "$file") -gt 2097152 ]; do
                mogrify -resize 90% -quality 85 "$file"
            done
            echo "Compressed: $file"
        fi
    fi
done