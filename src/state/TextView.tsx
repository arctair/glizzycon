import React from 'react'
import { Machine, RecipeKey, setRecipeKey, State } from '.'
import { recipeSettings } from './RecipeSettings'
import { Stack } from './Stacks'

export default function TextView({
  setState,
  state: { machines },
}: {
  setState: React.Dispatch<React.SetStateAction<State>>
  state: State
}) {
  return (
    <div>
      {machines.map((machine, index) => (
        <MachineView
          key={index}
          machine={machine}
          setRecipeKey={(recipeKey) =>
            setState(setRecipeKey(index, recipeKey))
          }
        />
      ))}
    </div>
  )
}

type MachineViewProps = {
  machine: Machine
  setRecipeKey: (key: RecipeKey) => void
}
function MachineView({ machine, setRecipeKey }: MachineViewProps) {
  return (
    <div>
      <div>{machine.type}</div>
      <div style={{ paddingLeft: '1rem' }}>
        {machine.type === 'assembler' ? (
          <>
            <div>
              recipe:{' '}
              <select
                value={machine.recipeKey}
                onChange={(e) => setRecipeKey(e.target.value as RecipeKey)}
              >
                {recipeSettings.recipes.map((recipe, index) => (
                  <option key={index} value={recipe.key}>
                    {recipe.key}
                  </option>
                ))}
              </select>
            </div>
            <div>potential: {machine.potential}</div>
            <div>in stacks:</div>
            <div style={{ paddingLeft: '1rem' }}>
              <Stacks stacks={machine.inStacks} />
            </div>
            <div>out stacks:</div>
            <div style={{ paddingLeft: '1rem' }}>
              <Stacks stacks={machine.outStacks} />
            </div>
          </>
        ) : (
          <Stacks stacks={machine.stacks} />
        )}
      </div>
    </div>
  )
}

type StacksProps = { stacks: Stack[] }
function Stacks({ stacks }: StacksProps) {
  return (
    <>
      {stacks.map((stack, index) => (
        <div key={index}>
          {stack.count} {stack.name}
        </div>
      ))}
    </>
  )
}