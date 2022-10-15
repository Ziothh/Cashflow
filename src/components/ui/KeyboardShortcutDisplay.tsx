interface Props {
    keyName: string
    meta?: boolean
}


const KeyboardShortcutDisplay: React.FC<Props> = ({
    keyName: key,
    meta = true
}) => {
    return (
        <div className="flex">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-2 py-1 font-sans text-sm font-medium text-gray-400">{meta && "⌘"}{key.toUpperCase()}</kbd>
        </div>
    )
}


export default KeyboardShortcutDisplay