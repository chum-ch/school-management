export default {
    sectionViewInfo(arrayItem, objInfo) {
        let items = arrayItem
        if (Array.isArray(items)) {
            items.forEach(key => {
                let val = objInfo[key.key];
                if (!val) {
                    val = "-"
                }
                key.value = val;
            });
            return items
        } else {
            return `Parameter ${arrayItem} must be array.`
        }
    }

}
