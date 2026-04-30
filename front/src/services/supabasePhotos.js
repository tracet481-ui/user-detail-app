import { supabase } from '../lib/supabase'

export async function uploadAlbumPhoto(file, albumId, title) {
  const ext = file.name.split('.').pop()
  const fileName = `${albumId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('album-images')
    .upload(fileName, file)

  if (uploadError) throw uploadError

  const { data: publicUrlData } = supabase.storage
    .from('album-images')
    .getPublicUrl(fileName)

  const imageUrl = publicUrlData.publicUrl

  const { data, error } = await supabase
    .from('album_photos')
    .insert([
      {
        album_id: albumId,
        title,
        image_url: imageUrl,
      },
    ])
    .select()

  if (error) throw error

  return data[0]
}

export async function getAlbumPhotosFromDb(albumId) {
  const { data, error } = await supabase
    .from('album_photos')
    .select('*')
    .eq('album_id', albumId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

export async function deleteAlbumPhotoFromDb(photoId, imageUrl) {
  const path = imageUrl.split('/album-images/')[1]

  if (path) {
    const { error: storageError } = await supabase.storage
      .from('album-images')
      .remove([path])

    if (storageError) throw storageError
  }

  const { error: dbError } = await supabase
    .from('album_photos')
    .delete()
    .eq('id', photoId)

  if (dbError) throw dbError
}