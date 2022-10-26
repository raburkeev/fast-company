export const transformQualitiesData = (qualitiesData) => {
    return qualitiesData.map(qual => ({label: qual.name, value: qual._id}))
}
