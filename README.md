# Photos Organizer

## Intended usage

```
organizer -organize <SourceDirectory> -s3 <BucketName>
```
Example:
```
organizer -organize /Users/me/Pictures/** -s3 pictures-backup
```

**-organize**

This will take all the pictures in `/Users/me/Pictures/**` (including in the subdirectories), and group them in folders according to the year and month in which the pictures were taken e.g. a picture `/Users/me/Pictures/birthday/2020_01_01_cake.jpg` will be moved to `/Users/me/Pictures/2020-01-01/2020_01_01_cake.jpg` (provided the exif data `DateTimeOriginal` is available). If the exif data is not available, then the file will be moved to `/Users/me/Pictures/To organize/2020_01_01_cake.jpg`.

**-s3**
Recreates the same folder structure in AWS S3.