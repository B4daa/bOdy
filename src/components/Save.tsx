import fals from 'fals'

import { getDate, skeletonToPose } from '../helpers/helpers'
import { setStore, store } from '../Store'

import { headerButton, panel } from '../styles'

const Save = () => {
  const saveDiaryEntry = async () => {
    alert('Saving is currently disabled');
    return;
    if (fals(store.skeleton)) return
    const data = {
      pose: skeletonToPose(store.skeleton),
      morphs: store.morphs,
      text: store.text,
      name: getDate(),
    }

    const lastEntry = store.entries.slice(-1)[0]

    console.log(data.name, lastEntry.name)

    if (data.name === lastEntry.name) {
      if (!confirm('are you sure you want to overwrite your entry of the day?')) return false
      setStore('entries', store.entries.length - 1, JSON.parse(JSON.stringify(data)))
    } else {
      setStore('entries', store.entries.length, JSON.parse(JSON.stringify(data)))
    }

    await fetch('./saveDiaryEntry.php', {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div class={panel}>
      <button class={headerButton} onClick={saveDiaryEntry} innerHTML="save" />
    </div>
  )
}
export default Save
